from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum
from ..core.database import Base

class AppStatus(str, Enum):
    DRAFT = "draft"
    IN_REVIEW = "in_review"
    APPROVED = "approved"
    PUBLISHED = "published"
    SUSPENDED = "suspended"
    ARCHIVED = "archived"

class AppType(str, Enum):
    MOBILE_APP = "mobile_app"
    GAME = "game"
    WEB_APP = "web_app"

class Platform(str, Enum):
    ANDROID = "android"
    IOS = "ios"
    WEB = "web"
    CROSS_PLATFORM = "cross_platform"

class App(Base):
    __tablename__ = "apps"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    package_name = Column(String, unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    
    # App details
    app_type = Column(SQLEnum(AppType), nullable=False)
    platform = Column(SQLEnum(Platform), nullable=False)
    version = Column(String, nullable=False, default="1.0.0")
    build_number = Column(Integer, default=1)
    
    # Status and lifecycle
    status = Column(SQLEnum(AppStatus), default=AppStatus.DRAFT, nullable=False)
    is_published = Column(Boolean, default=False)
    
    # Media
    icon_url = Column(String, nullable=True)
    screenshots = Column(Text, nullable=True)  # JSON array of URLs
    
    # Business info
    category = Column(String, nullable=True)
    tags = Column(Text, nullable=True)  # JSON array
    target_audience = Column(String, nullable=True)
    
    # Relationships
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    assigned_pm = Column(Integer, ForeignKey("users.id"), nullable=True)
    assigned_marketing = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    creator = relationship("User", foreign_keys=[created_by])
    product_manager = relationship("User", foreign_keys=[assigned_pm])
    marketing_manager = relationship("User", foreign_keys=[assigned_marketing])
    
    def __repr__(self):
        return f"<App(name='{self.name}', status='{self.status}')>"

