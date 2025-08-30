#!/usr/bin/env python3
"""
Backend API Test Suite for Shriram's Portfolio Website
Tests all backend endpoints including health check, contact form, and legacy routes
"""

import requests
import json
import sys
from datetime import datetime
import time

# Get backend URL from environment
BACKEND_URL = "https://skill-display-47.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_health_check(self):
        """Test GET /api/health endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["status", "message", "timestamp", "database"]
                
                if all(field in data for field in required_fields):
                    if data["status"] == "healthy" and data["database"] == "connected":
                        self.log_test("Health Check", True, 
                                    f"API healthy, database connected. Response time: {response.elapsed.total_seconds():.2f}s")
                    else:
                        self.log_test("Health Check", False, 
                                    f"Unhealthy status: {data.get('status')}, DB: {data.get('database')}")
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Health Check", False, 
                                f"Missing required fields: {missing}", data)
            else:
                self.log_test("Health Check", False, 
                            f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")

    def test_contact_form_valid_submission(self):
        """Test POST /api/contacts with valid data"""
        valid_contact_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@email.com",
            "phone": "+1-555-0123",
            "experience": "intermediate",
            "message": "Hi Shriram! I'm interested in improving my chess game. I've been playing for about 2 years and would love to learn some advanced strategies and tactics. Could we schedule a consultation to discuss coaching options?"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts",
                json=valid_contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                required_fields = ["success", "message", "data"]
                
                if all(field in data for field in required_fields):
                    if data["success"] and "id" in data["data"]:
                        self.log_test("Contact Form Valid Submission", True,
                                    f"Contact created successfully with ID: {data['data']['id']}")
                        return data["data"]["id"]  # Return ID for further tests
                    else:
                        self.log_test("Contact Form Valid Submission", False,
                                    "Success flag false or missing ID", data)
                else:
                    self.log_test("Contact Form Valid Submission", False,
                                f"Missing required response fields", data)
            else:
                self.log_test("Contact Form Valid Submission", False,
                            f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Valid Submission", False, f"Connection error: {str(e)}")
        
        return None

    def test_contact_form_validation(self):
        """Test POST /api/contacts with invalid data"""
        
        # Test 1: Missing required fields
        invalid_data_1 = {
            "name": "",
            "email": "invalid-email",
            "message": ""
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts",
                json=invalid_data_1,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 400 or response.status_code == 422:
                self.log_test("Contact Form Validation - Empty Fields", True,
                            f"Correctly rejected empty fields with HTTP {response.status_code}")
            else:
                self.log_test("Contact Form Validation - Empty Fields", False,
                            f"Should reject empty fields but got HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Validation - Empty Fields", False, f"Connection error: {str(e)}")

        # Test 2: Invalid email format
        invalid_data_2 = {
            "name": "John Doe",
            "email": "not-an-email",
            "message": "This is a valid message with more than 10 characters"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts",
                json=invalid_data_2,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 400 or response.status_code == 422:
                self.log_test("Contact Form Validation - Invalid Email", True,
                            f"Correctly rejected invalid email with HTTP {response.status_code}")
            else:
                self.log_test("Contact Form Validation - Invalid Email", False,
                            f"Should reject invalid email but got HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Validation - Invalid Email", False, f"Connection error: {str(e)}")

        # Test 3: Message too short
        invalid_data_3 = {
            "name": "Jane Smith",
            "email": "jane@email.com",
            "message": "Short"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts",
                json=invalid_data_3,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 400 or response.status_code == 422:
                self.log_test("Contact Form Validation - Short Message", True,
                            f"Correctly rejected short message with HTTP {response.status_code}")
            else:
                self.log_test("Contact Form Validation - Short Message", False,
                            f"Should reject short message but got HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Validation - Short Message", False, f"Connection error: {str(e)}")

    def test_contact_retrieval(self):
        """Test GET /api/contacts endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/contacts", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Contact Retrieval", True,
                                f"Successfully retrieved {len(data)} contact submissions")
                    
                    # Validate structure of first contact if any exist
                    if len(data) > 0:
                        contact = data[0]
                        required_fields = ["id", "name", "email", "message", "status", "createdAt"]
                        missing_fields = [f for f in required_fields if f not in contact]
                        
                        if not missing_fields:
                            self.log_test("Contact Structure Validation", True,
                                        "Contact objects have all required fields")
                        else:
                            self.log_test("Contact Structure Validation", False,
                                        f"Missing fields in contact: {missing_fields}")
                else:
                    self.log_test("Contact Retrieval", False,
                                "Response should be a list", data)
            else:
                self.log_test("Contact Retrieval", False,
                            f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Retrieval", False, f"Connection error: {str(e)}")

    def test_legacy_routes(self):
        """Test GET /api/ legacy endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "message" in data and "Portfolio API" in data["message"]:
                    self.log_test("Legacy Route", True,
                                f"Legacy endpoint working: {data['message']}")
                else:
                    self.log_test("Legacy Route", False,
                                "Unexpected response format", data)
            else:
                self.log_test("Legacy Route", False,
                            f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Legacy Route", False, f"Connection error: {str(e)}")

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            # Test with a GET request and Origin header to trigger CORS
            headers = {"Origin": "https://example.com"}
            response = self.session.get(f"{self.base_url}/health", headers=headers, timeout=10)
            
            cors_headers = [
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"
            ]
            
            present_headers = [h for h in cors_headers if h in response.headers]
            
            if len(present_headers) >= 1:  # At least one CORS header should be present
                origin_header = response.headers.get("Access-Control-Allow-Origin", "")
                self.log_test("CORS Headers", True,
                            f"CORS headers present: {present_headers}, Origin: {origin_header}")
            else:
                self.log_test("CORS Headers", False,
                            "No CORS headers found in response")
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Headers", False, f"Connection error: {str(e)}")

    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("BACKEND API TEST SUITE - SHRIRAM'S PORTFOLIO")
        print("=" * 60)
        print(f"Testing backend at: {self.base_url}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print()
        
        # Run tests in logical order
        self.test_health_check()
        self.test_legacy_routes()
        contact_id = self.test_contact_form_valid_submission()
        self.test_contact_form_validation()
        self.test_contact_retrieval()
        self.test_cors_headers()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        print()
        
        # List failed tests
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print("FAILED TESTS:")
            for test in failed_tests:
                print(f"  ❌ {test['test']}: {test['details']}")
        else:
            print("🎉 ALL TESTS PASSED!")
        
        print()
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)