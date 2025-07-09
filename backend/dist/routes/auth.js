"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../data/users");
const router = express_1.default.Router();
// Test route to get all users for demo
router.get('/test-users', (req, res) => {
    try {
        const testUsers = users_1.users.map(user => ({
            phoneNumber: user.phoneNumber,
            name: user.name
        }));
        res.json({
            success: true,
            data: testUsers,
            message: 'Test users retrieved successfully'
        });
    }
    catch (error) {
        console.error('Get test users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get test users'
        });
    }
});
// Send OTP endpoint
router.post('/send-otp', (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
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
        });
    }
    catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP'
        });
    }
});
// Login endpoint
router.post('/login', (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and OTP are required'
            });
        }
        // Find user by phone number
        const user = (0, users_1.findUserByPhone)(phoneNumber);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
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
            });
        }
        // Generate JWT token
        const secretKey = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            phoneNumber: user.phoneNumber,
            name: user.name
        }, secretKey, { expiresIn: '24h' });
        res.json({
            success: true,
            data: {
                token,
                user,
                message: 'Login successful'
            },
            message: 'Login successful'
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map