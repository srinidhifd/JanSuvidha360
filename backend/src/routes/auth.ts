import express from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse, LoginResponse, AuthRequest } from '../types';
import { findUserByPhone, users } from '../data/users';

const router = express.Router();

// Test route to get all users for demo
router.get('/test-users', (req: express.Request, res: express.Response) => {
  try {
    const testUsers = users.map(user => ({
      phoneNumber: user.phoneNumber,
      name: user.name
    }));
    
    res.json({
      success: true,
      data: testUsers,
      message: 'Test users retrieved successfully'
    } as ApiResponse<typeof testUsers>);
    
  } catch (error) {
    console.error('Get test users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get test users'
    } as ApiResponse<null>);
  }
});

// Send OTP endpoint
router.post('/send-otp', (req: express.Request, res: express.Response) => {
  try {
    const { phoneNumber }: AuthRequest = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      } as ApiResponse<null>);
    }
    
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real application, you would:
    // 1. Store the OTP in a database with expiration time
    // 2. Send the OTP via SMS service
    // 3. Implement rate limiting
    
    console.log(`📱 OTP for ${phoneNumber}: ${otp}`);
    
    res.json({
      success: true,
      data: { otp }, // In production, don't send OTP in response
      message: 'OTP sent successfully'
    } as ApiResponse<{ otp: string }>);
    
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP'
    } as ApiResponse<null>);
  }
});

// Login endpoint
router.post('/login', (req: express.Request, res: express.Response) => {
  try {
    const { phoneNumber, otp }: AuthRequest = req.body;
    
    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      } as ApiResponse<null>);
    }
    
    // Find user by phone number
    const user = findUserByPhone(phoneNumber);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse<null>);
    }
    
    // In a real application, you would:
    // 1. Verify the OTP against stored value
    // 2. Check if OTP has expired
    // 3. Implement proper rate limiting and security measures
    
    // For demo purposes, accept any 6-digit OTP
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format. Please enter a 6-digit OTP.'
      } as ApiResponse<null>);
    }
    
    // Generate JWT token
    const secretKey = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      { 
        userId: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name
      },
      secretKey,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      data: {
        token,
        user,
        message: 'Login successful'
      },
      message: 'Login successful'
    } as ApiResponse<LoginResponse>);
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    } as ApiResponse<null>);
  }
});

export default router; 