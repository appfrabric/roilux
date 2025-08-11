#!/bin/bash

echo "Testing RoiLux API endpoints..."
echo "================================"

# Test health check
echo -e "\n1. Testing Express server health check:"
curl -s https://roiluxe.com/_health | python3 -m json.tool || echo "Express server not responding"

# Test backend health
echo -e "\n2. Testing backend health via proxy:"
curl -s https://roiluxe.com/api/health | python3 -m json.tool || echo "Backend not accessible"

# Test contact endpoint
echo -e "\n3. Testing contact form submission:"
curl -X POST https://roiluxe.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test",
    "email": "test@example.com",
    "phone": "+1234567890",
    "subject": "Test Subject",
    "message": "Testing API endpoint"
  }' -s | python3 -m json.tool || echo "Contact API failed"

echo -e "\n================================"
echo "Test complete!"