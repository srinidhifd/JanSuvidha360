import axios, { AxiosResponse } from 'axios';
import { 
  ApiResponse, 
  LoginResponse, 
  User, 
  Scheme, 
  EligibilityResult, 
  EligibilityStats, 
  TestUser,
  UserDocuments
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL); // Debug log

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.url, 'with base URL:', config.baseURL); // Debug log
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response received:', response.config.url, response.status); // Debug log
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Send OTP to phone number
  sendOTP: async (phoneNumber: string): Promise<ApiResponse<{ phoneNumber: string; otp: string }>> => {
    try {
      console.log('Sending OTP to:', phoneNumber); // Debug log
      const response = await api.post<ApiResponse<{ phoneNumber: string; otp: string }>>(
        '/auth/send-otp',
        { phoneNumber }
      );
      return response.data;
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  },

  // Verify OTP and login
  verifyOTP: async (phoneNumber: string, otp: string): Promise<ApiResponse<LoginResponse>> => {
    try {
      console.log('Verifying OTP for:', phoneNumber); // Debug log
      const response = await api.post<ApiResponse<LoginResponse>>(
        '/auth/login',
        { phoneNumber, otp }
      );
      return response.data;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  },

  // Get test users
  getTestUsers: async (): Promise<ApiResponse<TestUser[]>> => {
    try {
      console.log('Fetching test users'); // Debug log
      const response = await api.get<ApiResponse<TestUser[]>>('/auth/test-users');
      return response.data;
    } catch (error) {
      console.error('Get test users error:', error);
      throw error;
    }
  },
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      console.log('Fetching user profile'); // Debug log
      const response = await api.get<ApiResponse<User>>('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      console.log('Updating user profile'); // Debug log
      const response = await api.put<ApiResponse<User>>('/user/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Get user verification status
  getVerificationStatus: async (): Promise<ApiResponse<any>> => {
    try {
      console.log('Fetching verification status'); // Debug log
      const response = await api.get<ApiResponse<any>>('/user/verification');
      return response.data;
    } catch (error) {
      console.error('Get verification status error:', error);
      throw error;
    }
  },

  // Get dashboard data
  getDashboardData: async (): Promise<ApiResponse<any>> => {
    try {
      console.log('Fetching dashboard data'); // Debug log
      const response = await api.get<ApiResponse<any>>('/user/dashboard');
      return response.data;
    } catch (error) {
      console.error('Get dashboard data error:', error);
      throw error;
    }
  },

  // Get all user documents
  getUserDocuments: async (): Promise<ApiResponse<UserDocuments>> => {
    try {
      console.log('Fetching user documents'); // Debug log
      const response = await api.get<ApiResponse<UserDocuments>>('/user/documents');
      return response.data;
    } catch (error) {
      console.error('Get user documents error:', error);
      throw error;
    }
  },

  // Get specific document
  getDocument: async (documentType: string): Promise<ApiResponse<any>> => {
    try {
      console.log('Fetching document:', documentType); // Debug log
      const response = await api.get<ApiResponse<any>>(`/user/documents/${documentType}`);
      return response.data;
    } catch (error) {
      console.error('Get document error:', error);
      throw error;
    }
  },
};

// Schemes API
export const schemesAPI = {
  // Get all schemes
  getAllSchemes: async (): Promise<ApiResponse<Scheme[]>> => {
    const response = await api.get<ApiResponse<Scheme[]>>('/schemes');
    return response.data;
  },

  // Get scheme by ID
  getSchemeById: async (id: string): Promise<ApiResponse<Scheme>> => {
    const response = await api.get<ApiResponse<Scheme>>(`/schemes/${id}`);
    return response.data;
  },

  // Get schemes by category
  getSchemesByCategory: async (category: string): Promise<ApiResponse<Scheme[]>> => {
    const response = await api.get<ApiResponse<Scheme[]>>(`/schemes/category/${category}`);
    return response.data;
  },

  // Get user's eligible schemes
  getEligibleSchemes: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get<ApiResponse<any[]>>('/schemes/eligible/me');
    return response.data;
  },

  // Get user's eligibility for all schemes
  getEligibilityResults: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get<ApiResponse<any[]>>('/schemes/eligibility/me');
    return response.data;
  },

  // Get ineligible schemes for user
  getIneligibleSchemes: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get<ApiResponse<any[]>>('/schemes/ineligible/me');
    return response.data;
  },

  // Check eligibility for specific scheme
  checkSchemeEligibility: async (schemeId: string): Promise<ApiResponse<any>> => {
    const response = await api.get<ApiResponse<any>>(`/schemes/check/${schemeId}`);
    return response.data;
  },
};

// Health check
export const healthCheck = async (): Promise<ApiResponse<{ status: string; message: string }>> => {
  const response = await api.get<ApiResponse<{ status: string; message: string }>>('/health');
  return response.data;
};

export default api; 