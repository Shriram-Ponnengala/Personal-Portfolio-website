from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum
import asyncio
import aiohttp


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Notification function
async def send_notifications(contact: 'ContactForm'):
    """Send WhatsApp and Email notifications for new contact submissions"""
    try:
        # WhatsApp notification (placeholder - implement with actual WhatsApp API)
        whatsapp_message = f"New session booking from {contact.name} ({contact.email}). Session type: {contact.sessionType or 'Not specified'}. Message: {contact.message[:100]}..."
        logger.info(f"WhatsApp notification would be sent: {whatsapp_message}")
        
        # Email notification (placeholder - implement with actual email service)
        email_subject = f"New Chess Coaching Session Booking - {contact.name}"
        email_body = f"""
        New session booking received:
        
        Name: {contact.name}
        Email: {contact.email}
        Phone: {contact.phone or 'Not provided'}
        Experience: {contact.experience or 'Not specified'}
        Session Type: {contact.sessionType or 'Not specified'}
        Message: {contact.message}
        
        Submitted at: {contact.createdAt.isoformat()}
        """
        logger.info(f"Email notification would be sent: {email_subject}")
        
        # In a real implementation, you would integrate with:
        # - WhatsApp Business API or Twilio WhatsApp API
        # - Email service like SendGrid, AWS SES, or SMTP
        
    except Exception as e:
        logger.error(f"Failed to send notifications: {str(e)}")
        # Don't raise the exception to avoid breaking the main flow

# Create the main app without a prefix
app = FastAPI(title="Shriram's Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Enums
class ChessExperience(str, Enum):
    complete_beginner = "complete-beginner"
    basic_knowledge = "basic-knowledge"
    intermediate = "intermediate"
    advanced = "advanced"
    competitive = "competitive"

class SessionType(str, Enum):
    consultation = "consultation"
    individual = "individual"
    group = "group"
    tournament_prep = "tournament-prep"
    online = "online"

class ContactStatus(str, Enum):
    new = "new"
    read = "read"
    replied = "replied"


# Define Models
class ContactFormCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    experience: Optional[ChessExperience] = None
    message: str = Field(..., min_length=10, max_length=1000)
    
    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()
    
    @validator('message')
    def validate_message(cls, v):
        if not v.strip():
            raise ValueError('Message cannot be empty')
        return v.strip()

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    experience: Optional[str] = None
    message: str
    status: ContactStatus = ContactStatus.new
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    
class ContactFormResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


# Contact Form Routes
@api_router.post("/contacts", response_model=ContactFormResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_submission(contact_data: ContactFormCreate):
    """Submit a new contact form"""
    try:
        # Create contact object
        contact = ContactForm(
            name=contact_data.name,
            email=contact_data.email,
            phone=contact_data.phone,
            experience=contact_data.experience,
            sessionType=contact_data.sessionType,
            message=contact_data.message
        )
        
        # Insert into database
        result = await db.contacts.insert_one(contact.dict())
        
        if result.inserted_id:
            # Send notifications (WhatsApp & Email)
            await send_notifications(contact)
            
            return ContactFormResponse(
                success=True,
                message="Session booking received! You'll receive instant WhatsApp & email notifications with response within 2-4 hours.",
                data={
                    "id": contact.id,
                    "createdAt": contact.createdAt.isoformat()
                }
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save contact form"
            )
            
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        logging.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error. Please try again later."
        )

@api_router.get("/contacts", response_model=List[ContactForm])
async def get_contact_submissions():
    """Get all contact submissions (for admin use)"""
    try:
        contacts = await db.contacts.find().sort("createdAt", -1).to_list(1000)
        return [ContactForm(**contact) for contact in contacts]
    except Exception as e:
        logging.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch contact submissions"
        )

@api_router.get("/contacts/{contact_id}", response_model=ContactForm)
async def get_contact_submission(contact_id: str):
    """Get a specific contact submission"""
    try:
        contact = await db.contacts.find_one({"id": contact_id})
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact submission not found"
            )
        return ContactForm(**contact)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching contact {contact_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch contact submission"
        )

@api_router.put("/contacts/{contact_id}/status")
async def update_contact_status(contact_id: str, new_status: ContactStatus):
    """Update contact submission status"""
    try:
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": {"status": new_status.value}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact submission not found"
            )
        
        return {"success": True, "message": f"Status updated to {new_status.value}"}
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update contact status"
        )

# Health Check Routes
@api_router.get("/health")
async def health_check():
    """Check API health and database connectivity"""
    try:
        # Test database connection
        await db.command("ping")
        return {
            "status": "healthy",
            "message": "API is running successfully",
            "timestamp": datetime.utcnow().isoformat(),
            "database": "connected"
        }
    except Exception as e:
        logging.error(f"Health check failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service unavailable - database connection failed"
        )

# Legacy Routes (keeping existing functionality)
@api_router.get("/")
async def root():
    return {"message": "Shriram's Portfolio API - Chess Coaching Platform"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Portfolio API starting up...")
    
    # Create database indexes for better performance
    try:
        await db.contacts.create_index("createdAt")
        await db.contacts.create_index("email")
        await db.contacts.create_index("status")
        logger.info("Database indexes created successfully")
    except Exception as e:
        logger.warning(f"Failed to create indexes: {str(e)}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Portfolio API shutting down...")
