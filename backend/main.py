from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
import os
from datetime import datetime
import json
import shutil
from pathlib import Path

app = FastAPI(title="Tropical Wood API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories for storing uploads
UPLOAD_DIR = Path("uploads")
IMAGES_DIR = UPLOAD_DIR / "images"
VIDEOS_DIR = UPLOAD_DIR / "videos"

for directory in [IMAGES_DIR, VIDEOS_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Sample data storage (in production, use a database)
VIRTUAL_TOURS = []
CONTACT_MESSAGES = []

# Pydantic models
class VirtualTourRequest(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    preferredDate: str
    preferredTime: str
    message: Optional[str] = None

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class Product(BaseModel):
    id: str
    title: str
    description: str
    category: str
    specifications: Dict[str, str]
    images: List[str]

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to Tropical Wood API",
        "status": "active",
        "version": "1.0.0"
    }

# Products endpoints
@app.get("/api/products")
def get_products():
    """Get all product categories"""
    return {
        "categories": [
            {
                "id": "plywood",
                "title": "Plywood",
                "description": "Premium, marine, and structural plywood",
                "productCount": 3
            },
            {
                "id": "melamine",
                "title": "Prefinished Melamine",
                "description": "Various colors with custom options",
                "productCount": 2
            },
            {
                "id": "melamine-plywood",
                "title": "Prefinished Melamine Plywood",
                "description": "High-quality melamine-faced plywood",
                "productCount": 2
            },
            {
                "id": "veneer",
                "title": "Wood Veneer",
                "description": "Different thicknesses and wood types",
                "productCount": 4
            },
            {
                "id": "logs",
                "title": "Raw Wood Logs",
                "description": "Sustainably sourced raw logs",
                "productCount": 1
            }
        ]
    }

@app.get("/api/products/{category}")
def get_products_by_category(category: str):
    """Get products by category"""
    categories_data = {
        "plywood": {
            "title": "Plywood",
            "products": [
                {
                    "id": "premium-plywood",
                    "title": "Premium Plywood",
                    "description": "High-grade plywood for furniture and construction",
                    "specifications": {
                        "Thickness": "1mm - 30mm",
                        "Sizes": "Standard and custom",
                        "Wood Types": "Okoume, Acajou, Ayous, Sapele"
                    }
                },
                {
                    "id": "marine-plywood",
                    "title": "Marine Plywood",
                    "description": "Water-resistant plywood for marine applications",
                    "specifications": {
                        "Thickness": "6mm - 25mm",
                        "Water Resistance": "High",
                        "Applications": "Boats, outdoor furniture"
                    }
                },
                {
                    "id": "structural-plywood",
                    "title": "Structural Plywood",
                    "description": "Strong plywood for construction use",
                    "specifications": {
                        "Thickness": "9mm - 30mm",
                        "Strength": "High load-bearing capacity",
                        "Applications": "Construction, flooring"
                    }
                }
            ]
        },
        "melamine": {
            "title": "Prefinished Melamine",
            "products": [
                {
                    "id": "white-melamine",
                    "title": "White Melamine",
                    "description": "Classic white finish",
                    "specifications": {
                        "Finish": "Smooth matte",
                        "Custom Colors": "Available"
                    }
                },
                {
                    "id": "wood-grain-melamine",
                    "title": "Wood Grain Melamine",
                    "description": "Natural wood appearance",
                    "specifications": {
                        "Patterns": "Multiple wood grains",
                        "Texture": "Embossed"
                    }
                }
            ]
        }
    }
    
    if category not in categories_data:
        raise HTTPException(status_code=404, detail="Category not found")
    
    return categories_data[category]

# Virtual tour booking
@app.post("/api/virtual-tour")
def book_virtual_tour(tour_request: VirtualTourRequest):
    """Book a virtual tour"""
    tour_data = tour_request.dict()
    tour_data["id"] = len(VIRTUAL_TOURS) + 1
    tour_data["created_at"] = datetime.now().isoformat()
    tour_data["status"] = "pending"
    
    VIRTUAL_TOURS.append(tour_data)
    
    return {
        "success": True,
        "message": "Virtual tour request submitted successfully",
        "tour_id": tour_data["id"]
    }

@app.get("/api/virtual-tours")
def get_virtual_tours():
    """Get all virtual tour requests (admin endpoint)"""
    return {"tours": VIRTUAL_TOURS, "total": len(VIRTUAL_TOURS)}

# Contact form
@app.post("/api/contact")
def submit_contact(message: ContactMessage):
    """Submit a contact message"""
    contact_data = message.dict()
    contact_data["id"] = len(CONTACT_MESSAGES) + 1
    contact_data["created_at"] = datetime.now().isoformat()
    contact_data["status"] = "unread"
    
    CONTACT_MESSAGES.append(contact_data)
    
    return {
        "success": True,
        "message": "Message sent successfully",
        "message_id": contact_data["id"]
    }

# Image upload endpoint
@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image file"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    file_extension = file.filename.split(".")[-1]
    file_name = f"{datetime.now().timestamp()}.{file_extension}"
    file_path = IMAGES_DIR / file_name
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {
        "success": True,
        "filename": file_name,
        "url": f"/api/images/{file_name}"
    }

# Video upload endpoint
@app.post("/api/upload/video")
async def upload_video(file: UploadFile = File(...)):
    """Upload a video file"""
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    file_extension = file.filename.split(".")[-1]
    file_name = f"{datetime.now().timestamp()}.{file_extension}"
    file_path = VIDEOS_DIR / file_name
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {
        "success": True,
        "filename": file_name,
        "url": f"/api/videos/{file_name}"
    }

# Serve uploaded images
@app.get("/api/images/{filename}")
def get_image(filename: str):
    """Serve uploaded images"""
    file_path = IMAGES_DIR / filename
    if not file_path.exists():
        # Return a placeholder image
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path)

# Serve uploaded videos
@app.get("/api/videos/{filename}")
def get_video(filename: str):
    """Serve uploaded videos"""
    file_path = VIDEOS_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Video not found")
    return FileResponse(file_path)

# Sample data endpoint
@app.get("/api/sample-request")
def request_sample():
    """Request product samples"""
    return {
        "message": "Sample request endpoint",
        "process": [
            "Fill out the sample request form",
            "Specify products and quantities",
            "Provide shipping information",
            "Receive confirmation within 24 hours",
            "Samples shipped within 3-5 business days"
        ]
    }

# Company information
@app.get("/api/company-info")
def get_company_info():
    """Get company information"""
    return {
        "name": "Tropical Wood, a division of Roilux",
        "location": "Cameroon",
        "established": "2010",
        "capacity": "50+ containers per month",
        "certifications": [
            "FSC Certified",
            "ISO 9001:2015",
            "PEFC Certified"
        ],
        "contact": {
            "email": "info@tropicalwood.com",
            "phone": "+237 XXX XXX XXX",
            "address": "Industrial Zone, Douala, Cameroon"
        }
    }

# Health check
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)