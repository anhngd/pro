from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from ....core.database import get_db
from ....core.auth import get_current_user
from ....models.user import User, UserRole
from ....models.app import App, AppStatus
from ....schemas.app import AppResponse, AppCreate, AppUpdate, AppListResponse

router = APIRouter()

@router.get("/", response_model=List[AppListResponse])
async def get_apps(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status_filter: Optional[AppStatus] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get list of apps"""
    query = db.query(App)
    
    # Filter by status if provided
    if status_filter:
        query = query.filter(App.status == status_filter)
    
    # Role-based filtering
    if current_user.role not in [UserRole.ADMIN, UserRole.EXECUTIVE]:
        # Non-admin users can only see apps they're involved with
        query = query.filter(
            (App.created_by == current_user.id) |
            (App.assigned_pm == current_user.id) |
            (App.assigned_marketing == current_user.id)
        )
    
    apps = query.offset(skip).limit(limit).all()
    return [AppListResponse.model_validate(app) for app in apps]

@router.get("/{app_id}", response_model=AppResponse)
async def get_app(
    app_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get app by ID"""
    app = db.query(App).filter(App.id == app_id).first()
    if not app:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="App not found"
        )
    
    # Check permissions
    if current_user.role not in [UserRole.ADMIN, UserRole.EXECUTIVE]:
        if app.created_by != current_user.id and app.assigned_pm != current_user.id and app.assigned_marketing != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions"
            )
    
    return AppResponse.model_validate(app)

@router.post("/", response_model=AppResponse)
async def create_app(
    app_data: AppCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create new app"""
    # Check if package name already exists
    existing_app = db.query(App).filter(App.package_name == app_data.package_name).first()
    if existing_app:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Package name already exists"
        )
    
    # Convert tags list to JSON string
    tags_json = json.dumps(app_data.tags) if app_data.tags else None
    
    # Create app
    app = App(
        **app_data.model_dump(exclude={'tags'}),
        tags=tags_json,
        created_by=current_user.id
    )
    
    db.add(app)
    db.commit()
    db.refresh(app)
    
    return AppResponse.model_validate(app)

@router.put("/{app_id}", response_model=AppResponse)
async def update_app(
    app_id: int,
    app_update: AppUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update app"""
    app = db.query(App).filter(App.id == app_id).first()
    if not app:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="App not found"
        )
    
    # Check permissions
    if current_user.role not in [UserRole.ADMIN, UserRole.EXECUTIVE]:
        if app.created_by != current_user.id and app.assigned_pm != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions"
            )
    
    # Update app fields
    update_data = app_update.model_dump(exclude_unset=True, exclude={'tags'})
    for field, value in update_data.items():
        setattr(app, field, value)
    
    # Handle tags separately
    if app_update.tags is not None:
        app.tags = json.dumps(app_update.tags)
    
    db.commit()
    db.refresh(app)
    
    return AppResponse.model_validate(app)

@router.delete("/{app_id}")
async def delete_app(
    app_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete app"""
    app = db.query(App).filter(App.id == app_id).first()
    if not app:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="App not found"
        )
    
    # Check permissions
    if current_user.role not in [UserRole.ADMIN] and app.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db.delete(app)
    db.commit()
    
    return {"message": "App deleted successfully"}

@router.post("/{app_id}/upload")
async def upload_app_file(
    app_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload app file (APK/IPA)"""
    app = db.query(App).filter(App.id == app_id).first()
    if not app:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="App not found"
        )
    
    # Check permissions
    if current_user.role not in [UserRole.ADMIN, UserRole.DEVELOPER] and app.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # TODO: Implement file upload logic
    # For now, just return a mock response
    return {"message": "File upload functionality coming soon", "filename": file.filename}
