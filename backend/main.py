from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
from sqlalchemy.orm import Session
import os
from datetime import datetime
import json
import shutil
from pathlib import Path
import httpx
from database import get_db, create_tables, User, ContactMessage, VirtualTour, Order, AdminUser
from translations import get_translation, get_user_language
import uuid
import hashlib

app = FastAPI(title="Tropical Wood API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
@app.on_event("startup")
async def startup_event():
    create_tables()
    await create_default_admin()

# Create directories for storing uploads
UPLOAD_DIR = Path("uploads")
IMAGES_DIR = UPLOAD_DIR / "images"
VIDEOS_DIR = UPLOAD_DIR / "videos"

for directory in [IMAGES_DIR, VIDEOS_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Pydantic models
class VirtualTourRequest(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    preferredDate: str
    preferredTime: str
    message: Optional[str] = None
    language: Optional[str] = "en"

class ContactMessageRequest(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    subject: str
    message: str
    language: Optional[str] = "en"

class UserRegistration(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    language: Optional[str] = "en"
    country: Optional[str] = None

class OrderRequest(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_company: Optional[str] = None
    customer_phone: Optional[str] = None
    products: List[Dict]
    notes: Optional[str] = None
    language: Optional[str] = "en"

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

# Language detection endpoint
@app.get("/api/detect-language")
async def detect_language(request: Request):
    """Detect user language based on location and headers"""
    
    # Try to get user's country from IP (simplified)
    client_ip = request.client.host
    country_code = None
    
    # In production, you would use a real GeoIP service
    # For now, we'll use the Accept-Language header
    
    language = get_user_language(request, country_code)
    
    return {
        "detected_language": language,
        "available_languages": ["en", "fr"],
        "country_code": country_code
    }

# Get translations endpoint
@app.get("/api/translations/{language}")
async def get_translations(language: str):
    """Get all translations for a specific language"""
    from translations import TRANSLATIONS
    
    if language not in TRANSLATIONS:
        raise HTTPException(status_code=404, detail="Language not supported")
    
    return {
        "language": language,
        "translations": TRANSLATIONS[language]
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
def book_virtual_tour(tour_request: VirtualTourRequest, db: Session = Depends(get_db)):
    """Book a virtual tour"""
    
    # Check if user exists or create new user
    user = db.query(User).filter(User.email == tour_request.email).first()
    if not user:
        user = User(
            name=tour_request.name,
            email=tour_request.email,
            company=tour_request.company,
            phone=tour_request.phone,
            language=tour_request.language
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Create virtual tour request
    tour = VirtualTour(
        user_id=user.id,
        name=tour_request.name,
        email=tour_request.email,
        company=tour_request.company,
        phone=tour_request.phone,
        preferred_date=tour_request.preferredDate,
        preferred_time=tour_request.preferredTime,
        message=tour_request.message,
        language=tour_request.language,
        status="pending"
    )
    
    db.add(tour)
    db.commit()
    db.refresh(tour)
    
    return {
        "success": True,
        "message": get_translation("tour_booked", tour_request.language),
        "tour_id": tour.id
    }

@app.get("/api/virtual-tours")
def get_virtual_tours(
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Get virtual tour requests with pagination (admin endpoint)"""
    offset = (page - 1) * limit
    
    # Query with sorting: non-archived first, then by created_at desc
    query = db.query(VirtualTour)
    
    # Get total count
    total = query.count()
    
    # Sort: non-archived first, then by date
    # SQLite doesn't handle boolean sorting directly, so we use CASE
    from sqlalchemy import case
    tours = query.order_by(
        case((VirtualTour.status == 'archived', 1), else_=0),  # 0 for non-archived, 1 for archived
        VirtualTour.created_at.desc()
    ).offset(offset).limit(limit).all()
    
    return {
        "tours": tours,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit
    }

@app.patch("/api/virtual-tours/{tour_id}/archive")
def archive_virtual_tour(tour_id: int, db: Session = Depends(get_db)):
    """Archive a virtual tour request"""
    tour = db.query(VirtualTour).filter(VirtualTour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    
    tour.status = "archived"
    tour.updated_at = datetime.now()
    db.commit()
    
    return {"success": True, "message": "Tour request archived successfully"}

@app.delete("/api/virtual-tours/{tour_id}")
def delete_virtual_tour(tour_id: int, db: Session = Depends(get_db)):
    """Delete a virtual tour request (admin only)"""
    tour = db.query(VirtualTour).filter(VirtualTour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    
    db.delete(tour)
    db.commit()
    
    return {"success": True, "message": "Tour request deleted successfully"}

# Contact form
@app.post("/api/contact")
def submit_contact(message_request: ContactMessageRequest, db: Session = Depends(get_db)):
    """Submit a contact message"""
    
    # Check if user exists or create new user
    user = db.query(User).filter(User.email == message_request.email).first()
    if not user:
        user = User(
            name=message_request.name,
            email=message_request.email,
            company=message_request.company,
            phone=message_request.phone,
            language=message_request.language
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Create contact message
    contact_message = ContactMessage(
        user_id=user.id,
        name=message_request.name,
        email=message_request.email,
        company=message_request.company,
        phone=message_request.phone,
        subject=message_request.subject,
        message=message_request.message,
        language=message_request.language,
        status="unread"
    )
    
    db.add(contact_message)
    db.commit()
    db.refresh(contact_message)
    
    return {
        "success": True,
        "message": get_translation("message_sent", message_request.language),
        "message_id": contact_message.id
    }

# User registration endpoint
@app.post("/api/users/register")
def register_user(user_data: UserRegistration, db: Session = Depends(get_db)):
    """Register a new user"""
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    # Create new user
    user = User(
        name=user_data.name,
        email=user_data.email,
        company=user_data.company,
        phone=user_data.phone,
        language=user_data.language,
        country=user_data.country
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": user.id
    }

# Order submission endpoint
@app.post("/api/orders")
def submit_order(order_request: OrderRequest, db: Session = Depends(get_db)):
    """Submit a product order/inquiry"""
    
    # Check if user exists or create new user
    user = db.query(User).filter(User.email == order_request.customer_email).first()
    if not user:
        user = User(
            name=order_request.customer_name,
            email=order_request.customer_email,
            company=order_request.customer_company,
            phone=order_request.customer_phone,
            language=order_request.language
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Generate order number
    order_number = f"TW{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:8].upper()}"
    
    # Create order
    order = Order(
        user_id=user.id,
        order_number=order_number,
        customer_name=order_request.customer_name,
        customer_email=order_request.customer_email,
        customer_company=order_request.customer_company,
        customer_phone=order_request.customer_phone,
        products=json.dumps(order_request.products),
        language=order_request.language,
        status="inquiry",
        notes=order_request.notes
    )
    
    db.add(order)
    db.commit()
    db.refresh(order)
    
    return {
        "success": True,
        "message": "Order inquiry submitted successfully",
        "order_id": order.id,
        "order_number": order.order_number
    }

# Get orders (admin endpoint)
@app.get("/api/orders")
def get_orders(db: Session = Depends(get_db)):
    """Get all orders (admin endpoint)"""
    orders = db.query(Order).all()
    
    # Convert JSON strings back to objects for display
    for order in orders:
        if order.products:
            try:
                order.products = json.loads(order.products)
            except:
                pass
    
    return {"orders": orders, "total": len(orders)}

# Get contact messages (admin endpoint)
@app.get("/api/contact-messages")
def get_contact_messages(
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """Get contact messages with pagination (admin endpoint)"""
    offset = (page - 1) * limit
    
    # Query with sorting: unarchived first, then by created_at desc
    query = db.query(ContactMessage)
    
    # Get total count
    total = query.count()
    
    # Sort: non-archived first, then by date
    # SQLite doesn't handle boolean sorting directly, so we use CASE
    from sqlalchemy import case
    messages = query.order_by(
        case((ContactMessage.status == 'archived', 1), else_=0),  # 0 for non-archived, 1 for archived
        ContactMessage.created_at.desc()
    ).offset(offset).limit(limit).all()
    
    return {
        "messages": messages,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit
    }

@app.patch("/api/contact-messages/{message_id}/archive")
def archive_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Archive a contact message"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message.status = "archived"
    message.updated_at = datetime.now()
    db.commit()
    
    return {"success": True, "message": "Message archived successfully"}

@app.delete("/api/contact-messages/{message_id}")
def delete_contact_message(message_id: int, db: Session = Depends(get_db)):
    """Delete a contact message (admin only)"""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(message)
    db.commit()
    
    return {"success": True, "message": "Message deleted successfully"}

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
            "email": "roilux.woods@gmail.com",
            "phone": "+237-681-21-1111",
            "address": "Abonbang, Cameroon"
        }
    }

# Health check
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Authentication Models
class LoginRequest(BaseModel):
    username: str
    password: str

class AdminUserRegistration(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

class PasswordChangeRequest(BaseModel):
    username: str
    new_password: str

def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

# Initialize default admin users
@app.on_event("startup")
async def create_default_admin():
    """Create default admin user if not exists"""
    db = next(get_db())
    
    # Check if admin user already exists
    existing_admin = db.query(AdminUser).filter(AdminUser.username == "admin").first()
    if not existing_admin:
        admin_user = AdminUser(
            username="admin",
            email="roilux.woods@gmail.com",
            password_hash=hash_password("roilux2024"),
            role="admin"
        )
        db.add(admin_user)
        
        # Add a sample processor
        processor_user = AdminUser(
            username="processor1",
            email="processor@roilux.com", 
            password_hash=hash_password("processor123"),
            role="processor"
        )
        db.add(processor_user)
        
        db.commit()

# Authentication endpoints
@app.post("/api/auth/login")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Admin/processor login"""
    admin_user = db.query(AdminUser).filter(AdminUser.username == login_data.username).first()
    
    if not admin_user or admin_user.password_hash != hash_password(login_data.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Update last login
    admin_user.last_login = datetime.now()
    db.commit()
    
    return {
        "success": True,
        "user": {
            "id": admin_user.id,
            "username": admin_user.username,
            "email": admin_user.email,
            "role": admin_user.role,
            "createdAt": admin_user.created_at.isoformat(),
            "lastLogin": admin_user.last_login.isoformat() if admin_user.last_login else None
        }
    }

@app.post("/api/auth/register")
def register_admin_user(user_data: AdminUserRegistration, db: Session = Depends(get_db)):
    """Register new admin/processor user"""
    
    # Check if user already exists
    existing_user = db.query(AdminUser).filter(
        (AdminUser.username == user_data.username) | (AdminUser.email == user_data.email)
    ).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists")
    
    # Validate role
    if user_data.role not in ["admin", "processor"]:
        raise HTTPException(status_code=400, detail="Invalid role. Must be 'admin' or 'processor'")
    
    # Create new admin user
    admin_user = AdminUser(
        username=user_data.username,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        role=user_data.role
    )
    
    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)
    
    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": admin_user.id
    }

@app.post("/api/auth/change-password")
def change_password(password_data: PasswordChangeRequest, db: Session = Depends(get_db)):
    """Change user password (admin only)"""
    
    admin_user = db.query(AdminUser).filter(AdminUser.username == password_data.username).first()
    
    if not admin_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update password
    admin_user.password_hash = hash_password(password_data.new_password)
    admin_user.updated_at = datetime.now()
    db.commit()
    
    return {
        "success": True,
        "message": "Password changed successfully"
    }

@app.get("/api/auth/users")
def get_all_admin_users(db: Session = Depends(get_db)):
    """Get all admin users"""
    admin_users = db.query(AdminUser).all()
    
    return {
        "users": [
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "createdAt": user.created_at.isoformat(),
                "lastLogin": user.last_login.isoformat() if user.last_login else None,
                "isActive": user.is_active
            } for user in admin_users
        ],
        "total": len(admin_users)
    }

# Password Reset Models
class PasswordResetRequest(BaseModel):
    email: str

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

# Password Reset endpoints
@app.post("/api/auth/request-password-reset")
def request_password_reset(request: PasswordResetRequest, db: Session = Depends(get_db)):
    """Request password reset"""
    admin_user = db.query(AdminUser).filter(AdminUser.email == request.email).first()
    
    if not admin_user:
        # Don't reveal if email exists or not for security
        return {"success": True, "message": "If the email exists, a reset link will be sent"}
    
    # Generate reset token
    import secrets
    reset_token = secrets.token_urlsafe(32)
    
    # Store token with expiration (30 minutes)
    # In production, you'd store this in database with expiration
    # For now, we'll use a simple in-memory store
    import time
    if not hasattr(app.state, 'reset_tokens'):
        app.state.reset_tokens = {}
    
    app.state.reset_tokens[reset_token] = {
        'user_id': admin_user.id,
        'email': admin_user.email,
        'expires': time.time() + 1800  # 30 minutes
    }
    
    # In production, you would send email here
    # For demo, we'll log the reset link
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"
    print(f"Password reset link: {reset_link}")
    
    return {"success": True, "message": "Password reset link sent"}

@app.post("/api/auth/validate-reset-token")
def validate_reset_token(token_data: dict, db: Session = Depends(get_db)):
    """Validate password reset token"""
    token = token_data.get('token')
    
    if not hasattr(app.state, 'reset_tokens'):
        return {"valid": False}
    
    token_info = app.state.reset_tokens.get(token)
    if not token_info:
        return {"valid": False}
    
    import time
    if time.time() > token_info['expires']:
        # Token expired, remove it
        del app.state.reset_tokens[token]
        return {"valid": False}
    
    return {"valid": True}

@app.post("/api/auth/reset-password")
def reset_password_confirm(request: PasswordResetConfirm, db: Session = Depends(get_db)):
    """Confirm password reset"""
    if not hasattr(app.state, 'reset_tokens'):
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    token_info = app.state.reset_tokens.get(request.token)
    if not token_info:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    import time
    if time.time() > token_info['expires']:
        # Token expired, remove it
        del app.state.reset_tokens[request.token]
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Get user and update password
    admin_user = db.query(AdminUser).filter(AdminUser.id == token_info['user_id']).first()
    if not admin_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update password
    admin_user.password_hash = hash_password(request.new_password)
    admin_user.updated_at = datetime.now()
    db.commit()
    
    # Remove used token
    del app.state.reset_tokens[request.token]
    
    return {"success": True, "message": "Password reset successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)