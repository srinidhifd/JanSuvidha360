"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get user profile
router.get('/profile', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user; // Auth middleware already provides the full user object
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            data: user,
            message: 'Profile retrieved successfully'
        });
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get profile'
        });
    }
});
// Update user profile
router.put('/profile', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user; // Auth middleware already provides the full user object
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // In a real app, you would update the user in the database
        // For now, we'll just return the existing user
        res.json({
            success: true,
            data: user,
            message: 'Profile updated successfully'
        });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile'
        });
    }
});
// Get user verification status
router.get('/verification', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user; // Auth middleware already provides the full user object
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
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
        });
    }
    catch (error) {
        console.error('Get verification status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get verification status'
        });
    }
});
// Get dashboard data
router.get('/dashboard', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user; // Auth middleware already provides the full user object
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
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
        });
    }
    catch (error) {
        console.error('Get dashboard data error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get dashboard data'
        });
    }
});
// Get all user documents
router.get('/documents', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user; // Auth middleware already provides the full user object
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            data: user.documents,
            message: 'Documents retrieved successfully'
        });
    }
    catch (error) {
        console.error('Get documents error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get documents'
        });
    }
});
// Get specific document
router.get('/documents/:type', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user; // Auth middleware already provides the full user object
        const documentType = req.params.type;
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const validDocTypes = ['aadhaar', 'pan', 'drivingLicense', 'passport'];
        if (!validDocTypes.includes(documentType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid document type'
            });
        }
        const document = user.documents[documentType];
        res.json({
            success: true,
            data: document,
            message: `${documentType} document retrieved successfully`
        });
    }
    catch (error) {
        console.error('Get document error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get document'
        });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map