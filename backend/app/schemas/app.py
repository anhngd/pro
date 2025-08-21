from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from ..models.app import AppStatus, AppType, Platform

class AppBase(BaseModel):
    name: str
    package_name: str
    description: Optional[str] = None
    app_type: AppType
    platform: Platform
    version: str = "1.0.0"
    category: Optional[str] = None
    target_audience: Optional[str] = None

class AppCreate(AppBase):
    build_number: int = 1
    tags: Optional[List[str]] = None

class AppUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    version: Optional[str] = None
    build_number: Optional[int] = None
    status: Optional[AppStatus] = None
    category: Optional[str] = None
    target_audience: Optional[str] = None
    tags: Optional[List[str]] = None
    assigned_pm: Optional[int] = None
    assigned_marketing: Optional[int] = None

class AppResponse(AppBase):
    id: int
    status: AppStatus
    build_number: int
    is_published: bool
    icon_url: Optional[str] = None
    screenshots: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    created_by: int
    assigned_pm: Optional[int] = None
    assigned_marketing: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    
    model_config = {"from_attributes": True}

class AppListResponse(BaseModel):
    id: int
    name: str
    package_name: str
    app_type: AppType
    platform: Platform
    status: AppStatus
    version: str
    icon_url: Optional[str] = None
    created_at: datetime
    
    model_config = {"from_attributes": True}
