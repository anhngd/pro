from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from enum import Enum
from ..core.database import Base

class UserRole(str, Enum):
    ADMIN = "admin"
    EXECUTIVE = "executive"
    BUSINESS_MANAGER = "business_manager"
    MARKETING_MANAGER = "marketing_manager"
    PRODUCT_MANAGER = "product_manager"
    DEVELOPER = "developer"
    ANALYST = "analyst"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    google_id = Column(String, unique=True, index=True, nullable=True)
    
    # Role and permissions
    role = Column(SQLEnum(UserRole), default=UserRole.ANALYST, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
        return f"<User(email='{self.email}', role='{self.role}')>"

