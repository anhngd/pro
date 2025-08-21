// User types
export enum UserRole {
  ADMIN = 'admin',
  EXECUTIVE = 'executive',
  BUSINESS_MANAGER = 'business_manager',
  MARKETING_MANAGER = 'marketing_manager',
  PRODUCT_MANAGER = 'product_manager',
  DEVELOPER = 'developer',
  ANALYST = 'analyst',
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at?: string;
  last_login?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// App types
export enum AppStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  SUSPENDED = 'suspended',
  ARCHIVED = 'archived',
}

export enum AppType {
  MOBILE_APP = 'mobile_app',
  GAME = 'game',
  WEB_APP = 'web_app',
}

export enum Platform {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
  CROSS_PLATFORM = 'cross_platform',
}

export interface App {
  id: number;
  name: string;
  package_name: string;
  description?: string;
  app_type: AppType;
  platform: Platform;
  version: string;
  build_number: number;
  status: AppStatus;
  is_published: boolean;
  icon_url?: string;
  screenshots?: string[];
  category?: string;
  tags?: string[];
  target_audience?: string;
  created_by: number;
  assigned_pm?: number;
  assigned_marketing?: number;
  created_at: string;
  updated_at?: string;
  published_at?: string;
}

// Analytics types
export interface AppAnalytics {
  id: number;
  app_id: number;
  daily_active_users: number;
  monthly_active_users: number;
  new_users: number;
  returning_users: number;
  session_duration_avg: number;
  sessions_per_user: number;
  retention_day_1: number;
  retention_day_7: number;
  retention_day_30: number;
  revenue: number;
  in_app_purchases: number;
  ad_revenue: number;
  arpu: number;
  crash_rate: number;
  app_store_rating: number;
  app_store_reviews_count: number;
  date: string;
  created_at: string;
}

export interface MarketingCampaign {
  id: number;
  name: string;
  description?: string;
  app_id: number;
  campaign_type: string;
  budget: number;
  spent: number;
  is_active: boolean;
  start_date: string;
  end_date?: string;
  impressions: number;
  clicks: number;
  installs: number;
  cost_per_install: number;
  created_by: number;
  created_at: string;
  updated_at?: string;
}

export interface BusinessMetrics {
  id: number;
  app_id: number;
  revenue_total: number;
  revenue_subscriptions: number;
  revenue_one_time: number;
  revenue_ads: number;
  development_cost: number;
  marketing_cost: number;
  operational_cost: number;
  customer_acquisition_cost: number;
  lifetime_value: number;
  churn_rate: number;
  month: string;
  created_at: string;
}

// API Response types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export interface ApiError {
  detail: string;
  status_code: number;
}

// Dashboard types
export interface DashboardStats {
  total_apps: number;
  published_apps: number;
  total_revenue: number;
  total_users: number;
  growth_rate: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}


