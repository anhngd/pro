from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App Configuration
    APP_NAME: str = "Mobile Publishing Platform"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    
    # Database Configuration
    DATABASE_URL: str = "postgresql://platform_user:platform_pass@localhost:5432/mobile_platform"
    
    # Redis Configuration
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT Configuration
    JWT_SECRET: str = "your-super-secret-jwt-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24
    
    # Google OAuth Configuration
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/google/callback"
    
    # CORS Configuration
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
    # File Upload Configuration
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    ALLOWED_EXTENSIONS: List[str] = [".apk", ".ipa", ".aab", ".zip", ".png", ".jpg", ".jpeg"]
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()