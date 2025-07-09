import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { findUserById } from '../data/users';
import { ApiResponse, User } from '../types';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, (req: any, res: express.Response) => {
  try {
    const user = req.user; // Auth middleware already provides the full user object
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: user,
      message: 'Profile retrieved successfully'
    } as ApiResponse<User>);
    
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile'
    } as ApiResponse<null>);
  }
});

// Update user profile
router.put('/profile', authMiddleware, (req: any, res: express.Response) => {
  try {
    const user = req.user; // Auth middleware already provides the full user object
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse<null>);
    }
    
    // In a real app, you would update the user in the database
    // For now, we'll just return the existing user
    res.json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    } as ApiResponse<User>);
    
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    } as ApiResponse<null>);
  }
});

// Get user verification status
router.get('/verification', authMiddleware, (req: any, res: express.Response) => {
  try {
    const user = req.user; // Auth middleware already provides the full user object
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse<null>);
    }
    
    const verificationStatus = {
      isVerified: user.isVerified,
      profileCompleted: user.profileCompleted,
      documentsSubmitted: true, // All demo users have documents
      verificationLevel: user.isVerified ? 'complete' : 'pending'
    };
    
    res.json({
      success: true,
      data: verificationStatus,
      message: 'Verification status retrieved successfully'
    } as ApiResponse<typeof verificationStatus>);
    
  } catch (error) {
    console.error('Get verification status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification status'
    } as ApiResponse<null>);
  }
});

// Get dashboard data
router.get('/dashboard', authMiddleware, (req: any, res: express.Response) => {
  try {
    const user = req.user; // Auth middleware already provides the full user object
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse<null>);
    }
    
    const dashboardData = {
      user: {
        name: user.name,
        profileCompleted: user.profileCompleted,
        isVerified: user.isVerified
      },
      quickStats: {
        documentsUploaded: 4,
        schemesEligible: 8,
        applicationsSubmitted: 2
      }
    };
    
    res.json({
      success: true,
      data: dashboardData,
      message: 'Dashboard data retrieved successfully'
    } as ApiResponse<typeof dashboardData>);
    
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard data'
    } as ApiResponse<null>);
  }
});

// Get all user documents
router.get('/documents', authMiddleware, (req: any, res: express.Response) => {
  try {
    const user = req.user; // Auth middleware already provides the full user object
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: user.documents,
      message: 'Documents retrieved successfully'
    } as ApiResponse<typeof user.documents>);
    
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get documents'
    } as ApiResponse<null>);
  }
});

// Get specific document
router.get('/documents/:type', authMiddleware, (req: any, res: express.Response) => {
  try {
    const user = req.user; // Auth middleware already provides the full user object
    const documentType = req.params.type;
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse<null>);
    }
    
    const validDocTypes = ['aadhaar', 'pan', 'drivingLicense', 'passport'];
    if (!validDocTypes.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document type'
      } as ApiResponse<null>);
    }
    
    const document = user.documents[documentType as keyof typeof user.documents];
    
    res.json({
      success: true,
      data: document,
      message: `${documentType} document retrieved successfully`
    } as ApiResponse<typeof document>);
    
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get document'
    } as ApiResponse<null>);
  }
});

export default router; 