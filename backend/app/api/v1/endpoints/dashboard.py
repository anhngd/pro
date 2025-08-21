from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ....core.database import get_db
from ....core.auth import get_current_user
from ....models.user import User

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics"""
    # TODO: Implement actual dashboard statistics
    # For now, return mock data
    return {
        "total_apps": 24,
        "published_apps": 18,
        "total_revenue": 125000,
        "total_users": 45000,
        "total_downloads": 1200000,
        "avg_rating": 4.3,
        "growth_rate": 12.5
    }

@router.get("/charts/{chart_type}")
async def get_chart_data(
    chart_type: str,
    period: str = "30d",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get chart data for dashboard"""
    # TODO: Implement actual chart data queries
    # For now, return mock data based on chart type
    
    if chart_type == "revenue":
        return [
            {"month": "Jan", "revenue": 45000},
            {"month": "Feb", "revenue": 52000},
            {"month": "Mar", "revenue": 48000},
            {"month": "Apr", "revenue": 61000},
            {"month": "May", "revenue": 75000},
            {"month": "Jun", "revenue": 68000},
        ]
    elif chart_type == "users":
        return [
            {"month": "Jan", "users": 12000},
            {"month": "Feb", "users": 15000},
            {"month": "Mar", "users": 14000},
            {"month": "Apr", "users": 18000},
            {"month": "May", "users": 22000},
            {"month": "Jun", "users": 20000},
        ]
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chart type not found"
        )


