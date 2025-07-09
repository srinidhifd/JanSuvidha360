import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { authAPI } from '../services/api';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    console.log('🔄 AuthContext init - checking saved auth data');
    console.log('📊 Saved token exists:', !!savedToken);
    console.log('📊 Saved user exists:', !!savedUser);
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('🔄 Restoring user session:', userData.name);
        setToken(savedToken);
        setUser(userData);
      } catch (error) {
        console.error('❌ Error parsing saved user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      console.log('🔄 No saved authentication data found');
    }
    
    setLoading(false);
  }, []);

  const sendOTP = async (phoneNumber: string): Promise<void> => {
    try {
      const response = await authAPI.sendOTP(phoneNumber);
      if (response.success) {
        // Remove duplicate toast - let Login component handle the UI feedback
        return;
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send OTP';
      toast.error(errorMessage);
      throw error;
    }
  };

  const login = async (phoneNumber: string, otp: string): Promise<void> => {
    try {
      console.log('🔐 Starting login process for:', phoneNumber);
      const response = await authAPI.verifyOTP(phoneNumber, otp);
      console.log('🔐 Login response:', response);
      
      if (response.success && response.data) {
        const { token: newToken, user: userData } = response.data;
        
        console.log('🔐 Login successful, setting user data:', userData);
        
        // Save to localStorage first
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update state
        setToken(newToken);
        setUser(userData);
        
        console.log('🔐 State updated, user:', userData);
        console.log('🔐 LocalStorage token:', !!localStorage.getItem('token'));
        console.log('🔐 LocalStorage user:', !!localStorage.getItem('user'));
        
        // Remove duplicate toast - let Login component handle the UI feedback
        
        // State updates are synchronous, React Router will handle navigation
        console.log('🔐 Login process completed successfully');
        
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('🔐 Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = (): void => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear state
    setToken(null);
    setUser(null);
    
    toast.success('Logged out successfully');
  };

  const contextValue: AuthContextType = {
    user,
    token,
    loading,
    login,
    logout,
    sendOTP,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 