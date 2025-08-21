from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from ....core.database import get_db
from ....core.auth import verify_google_token, create_access_token, get_current_user
from ....models.user import User
from ....schemas.user import GoogleAuthRequest, AuthResponse, UserResponse

router = APIRouter()

@router.post("/google", response_model=AuthResponse)
async def google_auth(
    auth_request: GoogleAuthRequest,
    db: Session = Depends(get_db)
):
    """Authenticate user with Google OAuth"""
    try:
        # Verify Google token
        google_user = await verify_google_token(auth_request.id_token)
        
        # Extract user info from Google token
        email = google_user.get("email")
        name = google_user.get("name")
        google_id = google_user.get("sub")
        avatar_url = google_user.get("picture")
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email not found in Google token"
            )
        
        # Find or create user
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            # Create new user
            user = User(
                email=email,
                full_name=name or "",
                google_id=google_id,
                avatar_url=avatar_url,
                is_verified=True,
                is_active=True
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Update existing user info
            user.google_id = google_id
            user.avatar_url = avatar_url
            user.full_name = name or user.full_name
            user.is_verified = True
            user.last_login = datetime.utcnow()
            db.commit()
            db.refresh(user)
        
        # Create access token
        access_token = create_access_token(
            data={"sub": str(user.id), "email": user.email}
        )
        
        return AuthResponse(
            access_token=access_token,
            user=UserResponse.model_validate(user)
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}"
        )

@router.post("/logout")
async def logout():
    """Logout user (client should remove token)"""
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current authenticated user information"""
    return UserResponse.model_validate(current_user)