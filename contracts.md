# API Contracts & Backend Integration Plan

## Current Mock Data Analysis

### Frontend Mock Data Used:
1. **Contact Form Submissions** - Currently shows success toast but doesn't persist
2. **Static Content** - All portfolio content (experience, achievements, testimonials) is hardcoded
3. **Social Media Links** - Hardcoded in components

## Backend Implementation Plan

### 1. Database Models

#### Contact Submission Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (optional),
  experience: String (optional),
  message: String (required),
  createdAt: Date,
  status: String (enum: ['new', 'read', 'replied'])
}
```

#### Portfolio Content Model (Optional - for dynamic content)
```javascript
{
  _id: ObjectId,
  section: String (enum: ['about', 'experience', 'achievements', 'testimonials']),
  content: Object,
  isActive: Boolean,
  updatedAt: Date
}
```

### 2. API Endpoints to Implement

#### Contact Management
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contact submissions (admin)
- `PUT /api/contacts/:id` - Update contact status (admin)
- `DELETE /api/contacts/:id` - Delete contact (admin)

#### Health Check
- `GET /api/health` - Backend health status

### 3. Frontend Integration Changes

#### Contact Form Component (`/components/Contact.js`)
**Current Mock Behavior:**
```javascript
// Mock submission with setTimeout
setTimeout(() => {
  toast({ title: "Message Sent Successfully!" });
  setFormData({}); // Reset form
}, 1000);
```

**New Backend Integration:**
```javascript
const response = await axios.post(`${BACKEND_URL}/api/contacts`, formData);
if (response.status === 201) {
  toast({ title: "Message Sent Successfully!" });
  setFormData({}); // Reset form
}
```

#### Error Handling
- Network errors
- Validation errors
- Server errors
- Loading states

### 4. Backend Validation Rules

#### Contact Form Validation:
- `name`: Required, min 2 characters, max 100 characters
- `email`: Required, valid email format
- `phone`: Optional, valid phone format
- `experience`: Optional, enum values
- `message`: Required, min 10 characters, max 1000 characters

### 5. Response Formats

#### Success Response:
```javascript
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "contact_id",
    "createdAt": "2025-01-20T10:30:00Z"
  }
}
```

#### Error Response:
```javascript
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "name": "Name is required",
    "email": "Invalid email format"
  }
}
```

### 6. Security Considerations

- Input validation and sanitization
- Rate limiting for contact form submissions
- CORS configuration
- Basic spam protection

### 7. Environment Variables

```env
# Backend .env additions needed
DB_NAME=shriram_portfolio
CONTACT_EMAIL_NOTIFICATION=true (optional for future email notifications)
```

## Integration Testing Plan

1. **Contact Form Submission**
   - Valid form submission
   - Invalid data handling
   - Network error scenarios
   - Loading states

2. **Data Persistence**
   - Verify data is saved to MongoDB
   - Check data integrity
   - Test retrieval endpoints

3. **Error Handling**
   - Frontend error display
   - Network connectivity issues
   - Server error responses

## Future Enhancements (Optional)

1. **Admin Panel** - View/manage contact submissions
2. **Email Notifications** - Send emails on form submission
3. **Analytics** - Track form submission metrics
4. **Dynamic Content** - Allow editing portfolio content via admin panel

## Files to Modify

### Backend Files:
- `/app/backend/server.py` - Add new routes and models
- `/app/backend/requirements.txt` - Add any new dependencies

### Frontend Files:
- `/app/frontend/src/components/Contact.js` - Replace mock with API calls
- Remove mock data, add error handling

### Environment:
- Update `/app/backend/.env` if needed

## Success Criteria

✅ Contact form submissions are stored in MongoDB
✅ Frontend displays appropriate success/error messages  
✅ Form validation works on both frontend and backend
✅ No breaking changes to existing functionality
✅ Responsive error handling for network issues