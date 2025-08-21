from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base

class AppAnalytics(Base):
    __tablename__ = "app_analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    app_id = Column(Integer, ForeignKey("apps.id"), nullable=False)
    
    # User metrics
    daily_active_users = Column(Integer, default=0)
    monthly_active_users = Column(Integer, default=0)
    new_users = Column(Integer, default=0)
    returning_users = Column(Integer, default=0)
    
    # Engagement metrics
    session_duration_avg = Column(Float, default=0.0)  # in minutes
    sessions_per_user = Column(Float, default=0.0)
    retention_day_1 = Column(Float, default=0.0)  # percentage
    retention_day_7 = Column(Float, default=0.0)
    retention_day_30 = Column(Float, default=0.0)
    
    # Revenue metrics
    revenue = Column(Float, default=0.0)
    in_app_purchases = Column(Float, default=0.0)
    ad_revenue = Column(Float, default=0.0)
    arpu = Column(Float, default=0.0)  # Average Revenue Per User
    
    # Technical metrics
    crash_rate = Column(Float, default=0.0)  # percentage
    app_store_rating = Column(Float, default=0.0)
    app_store_reviews_count = Column(Integer, default=0)
    
    # Date for the analytics data
    date = Column(DateTime(timezone=True), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    app = relationship("App")
    
    def __repr__(self):
        return f"<AppAnalytics(app_id={self.app_id}, date='{self.date}')>"

class MarketingCampaign(Base):
    __tablename__ = "marketing_campaigns"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    
    # Campaign details
    app_id = Column(Integer, ForeignKey("apps.id"), nullable=False)
    campaign_type = Column(String, nullable=False)  # social_media, google_ads, apple_search_ads, etc.
    budget = Column(Float, default=0.0)
    spent = Column(Float, default=0.0)
    
    # Campaign status
    is_active = Column(Boolean, default=True)
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=True)
    
    # Performance metrics
    impressions = Column(Integer, default=0)
    clicks = Column(Integer, default=0)
    installs = Column(Integer, default=0)
    cost_per_install = Column(Float, default=0.0)
    
    # Relationships
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    app = relationship("App")
    creator = relationship("User")
    
    def __repr__(self):
        return f"<MarketingCampaign(name='{self.name}', app_id={self.app_id})>"

class BusinessMetrics(Base):
    __tablename__ = "business_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    app_id = Column(Integer, ForeignKey("apps.id"), nullable=False)
    
    # Financial metrics
    revenue_total = Column(Float, default=0.0)
    revenue_subscriptions = Column(Float, default=0.0)
    revenue_one_time = Column(Float, default=0.0)
    revenue_ads = Column(Float, default=0.0)
    
    # Cost metrics
    development_cost = Column(Float, default=0.0)
    marketing_cost = Column(Float, default=0.0)
    operational_cost = Column(Float, default=0.0)
    
    # Business KPIs
    customer_acquisition_cost = Column(Float, default=0.0)
    lifetime_value = Column(Float, default=0.0)
    churn_rate = Column(Float, default=0.0)
    
    # Date for the metrics
    month = Column(DateTime(timezone=True), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    app = relationship("App")
    
    def __repr__(self):
        return f"<BusinessMetrics(app_id={self.app_id}, month='{self.month}')>"
