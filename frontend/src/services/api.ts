import axios, { AxiosResponse } from 'axios';
import { AuthResponse, User, App, AppAnalytics, MarketingCampaign, BusinessMetrics, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem('access_token');
      // Don't redirect if using demo token
      if (!token || !token.startsWith('demo-token-')) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  googleLogin: (idToken: string): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/google', { id_token: idToken }),
  
  logout: (): Promise<AxiosResponse<{ message: string }>> =>
    api.post('/auth/logout'),
  
  getCurrentUser: (): Promise<AxiosResponse<User>> =>
    api.get('/auth/me'),
};

// Users API
export const usersApi = {
  getUsers: (page = 1, perPage = 20): Promise<AxiosResponse<PaginatedResponse<User>>> =>
    api.get(`/users?page=${page}&per_page=${perPage}`),
  
  getUser: (id: number): Promise<AxiosResponse<User>> =>
    api.get(`/users/${id}`),
  
  updateUser: (id: number, data: Partial<User>): Promise<AxiosResponse<User>> =>
    api.put(`/users/${id}`, data),
  
  deleteUser: (id: number): Promise<AxiosResponse<{ message: string }>> =>
    api.delete(`/users/${id}`),
};

// Apps API
export const appsApi = {
  getApps: (page = 1, perPage = 20, filters?: any): Promise<AxiosResponse<PaginatedResponse<App>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...filters,
    });
    return api.get(`/apps?${params}`);
  },
  
  getApp: (id: number): Promise<AxiosResponse<App>> =>
    api.get(`/apps/${id}`),
  
  createApp: (data: Partial<App>): Promise<AxiosResponse<App>> =>
    api.post('/apps', data),
  
  updateApp: (id: number, data: Partial<App>): Promise<AxiosResponse<App>> =>
    api.put(`/apps/${id}`, data),
  
  deleteApp: (id: number): Promise<AxiosResponse<{ message: string }>> =>
    api.delete(`/apps/${id}`),
  
  uploadAppFile: (id: number, file: File): Promise<AxiosResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/apps/${id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Analytics API
export const analyticsApi = {
  getAppAnalytics: (
    appId: number, 
    startDate?: string, 
    endDate?: string
  ): Promise<AxiosResponse<AppAnalytics[]>> => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    return api.get(`/analytics/apps/${appId}?${params}`);
  },
  
  getOverallAnalytics: (
    startDate?: string, 
    endDate?: string
  ): Promise<AxiosResponse<any>> => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    return api.get(`/analytics/overview?${params}`);
  },
};

// Marketing API
export const marketingApi = {
  getCampaigns: (page = 1, perPage = 20): Promise<AxiosResponse<PaginatedResponse<MarketingCampaign>>> =>
    api.get(`/marketing/campaigns?page=${page}&per_page=${perPage}`),
  
  getCampaign: (id: number): Promise<AxiosResponse<MarketingCampaign>> =>
    api.get(`/marketing/campaigns/${id}`),
  
  createCampaign: (data: Partial<MarketingCampaign>): Promise<AxiosResponse<MarketingCampaign>> =>
    api.post('/marketing/campaigns', data),
  
  updateCampaign: (id: number, data: Partial<MarketingCampaign>): Promise<AxiosResponse<MarketingCampaign>> =>
    api.put(`/marketing/campaigns/${id}`, data),
  
  deleteCampaign: (id: number): Promise<AxiosResponse<{ message: string }>> =>
    api.delete(`/marketing/campaigns/${id}`),
};

// Business API
export const businessApi = {
  getBusinessMetrics: (
    appId?: number,
    startDate?: string,
    endDate?: string
  ): Promise<AxiosResponse<BusinessMetrics[]>> => {
    const params = new URLSearchParams();
    if (appId) params.append('app_id', appId.toString());
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    return api.get(`/business/metrics?${params}`);
  },
  
  getRevenueReport: (
    startDate?: string,
    endDate?: string
  ): Promise<AxiosResponse<any>> => {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    return api.get(`/business/revenue?${params}`);
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: (): Promise<AxiosResponse<any>> =>
    api.get('/dashboard/stats'),
  
  getChartData: (type: string, period = '30d'): Promise<AxiosResponse<any>> =>
    api.get(`/dashboard/charts/${type}?period=${period}`),
};
