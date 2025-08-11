#!/usr/bin/env python3
"""
Script to reset admin password or create admin user if not exists
"""
import hashlib
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import AdminUser, Base

def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def reset_admin_password():
    # Create database connection
    engine = create_engine("sqlite:///./data/tropical_wood.db")
    Base.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Check if admin exists
        admin = db.query(AdminUser).filter(AdminUser.username == "admin").first()
        
        if admin:
            # Update password
            admin.password_hash = hash_password("roilux2024")
            print(f"Admin user exists. Password reset to: roilux2024")
            print(f"Current password hash: {admin.password_hash}")
        else:
            # Create admin user
            admin = AdminUser(
                username="admin",
                email="roilux.woods@gmail.com",
                password_hash=hash_password("roilux2024"),
                role="admin"
            )
            db.add(admin)
            print("Admin user created with username: admin, password: roilux2024")
            print(f"Password hash: {admin.password_hash}")
        
        # Also ensure processor exists
        processor = db.query(AdminUser).filter(AdminUser.username == "processor1").first()
        if not processor:
            processor = AdminUser(
                username="processor1",
                email="processor@roilux.com",
                password_hash=hash_password("processor123"),
                role="processor"
            )
            db.add(processor)
            print("Processor user created with username: processor1, password: processor123")
        
        db.commit()
        print("\nAll users in database:")
        all_users = db.query(AdminUser).all()
        for user in all_users:
            print(f"  - {user.username} ({user.role}): email={user.email}")
        
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Resetting admin password...")
    print(f"Expected password hash for 'roilux2024': {hash_password('roilux2024')}")
    reset_admin_password()
    print("\nDone!")