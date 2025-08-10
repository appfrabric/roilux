from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Enum, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Database configuration
# Ensure data directory exists
os.makedirs("data", exist_ok=True)

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "sqlite:///./data/tropical_wood.db"
)

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    company = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    language = Column(String(5), default="en", nullable=False)  # en, fr
    country = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

class AdminUser(Base):
    __tablename__ = "admin_users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)  # Optional - if user is registered
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    language = Column(String(5), default="en", nullable=False)
    status = Column(Enum("unread", "read", "replied", "archived", name="message_status"), default="unread")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class VirtualTour(Base):
    __tablename__ = "virtual_tours"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)  # Optional - if user is registered
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    preferred_date = Column(String(50), nullable=False)
    preferred_time = Column(String(50), nullable=False)
    message = Column(Text, nullable=True)
    language = Column(String(5), default="en", nullable=False)
    status = Column(Enum("pending", "confirmed", "completed", "cancelled", "archived", name="tour_status"), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)  # Optional - if user is registered
    order_number = Column(String(50), unique=True, nullable=False)
    customer_name = Column(String(100), nullable=False)
    customer_email = Column(String(255), nullable=False)
    customer_company = Column(String(255), nullable=True)
    customer_phone = Column(String(50), nullable=True)
    products = Column(Text, nullable=False)  # JSON string of products
    total_amount = Column(String(50), nullable=True)  # String for flexibility with currency
    currency = Column(String(10), default="USD")
    language = Column(String(5), default="en", nullable=False)
    status = Column(Enum("inquiry", "quote_sent", "confirmed", "in_production", "shipped", "delivered", "cancelled", name="order_status"), default="inquiry")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
def create_tables():
    Base.metadata.create_all(bind=engine)