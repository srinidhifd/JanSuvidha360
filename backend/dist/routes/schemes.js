"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemes_1 = require("../data/schemes");
const eligibilityService_1 = require("../services/eligibilityService");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all active schemes
router.get('/', (req, res) => {
    try {
        const schemes = (0, schemes_1.getActiveSchemes)();
        res.json({
            success: true,
            data: schemes,
            message: 'Schemes fetched successfully'
        });
    }
    catch (error) {
        console.error('Get schemes error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch schemes'
        });
    }
});
// Get scheme by ID
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const scheme = (0, schemes_1.getSchemeById)(id);
        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: 'Scheme not found'
            });
        }
        res.json({
            success: true,
            data: scheme,
            message: 'Scheme fetched successfully'
        });
    }
    catch (error) {
        console.error('Get scheme by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scheme'
        });
    }
});
// Get schemes by category
router.get('/category/:category', (req, res) => {
    try {
        const { category } = req.params;
        const schemes = (0, schemes_1.getSchemesByCategory)(category);
        res.json({
            success: true,
            data: schemes,
            message: `Schemes in ${category} category fetched successfully`
        });
    }
    catch (error) {
        console.error('Get schemes by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch schemes by category'
        });
    }
});
// Get user's eligible schemes (requires authentication)
router.get('/eligible/me', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user;
        const allSchemes = (0, schemes_1.getActiveSchemes)();
        const eligibleSchemes = eligibilityService_1.EligibilityService.getEligibleSchemes(user, allSchemes);
        res.json({
            success: true,
            data: eligibleSchemes,
            message: 'Eligible schemes fetched successfully'
        });
    }
    catch (error) {
        console.error('Get eligible schemes error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch eligible schemes'
        });
    }
});
// Get user's eligibility for all schemes (requires authentication)
router.get('/eligibility/me', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user;
        const allSchemes = (0, schemes_1.getActiveSchemes)();
        const eligibilityResults = eligibilityService_1.EligibilityService.getAllSchemesWithEligibility(user, allSchemes);
        res.json({
            success: true,
            data: eligibilityResults,
            message: 'Eligibility results fetched successfully'
        });
    }
    catch (error) {
        console.error('Get eligibility results error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch eligibility results'
        });
    }
});
// Get ineligible schemes for user (requires authentication)
router.get('/ineligible/me', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user;
        const allSchemes = (0, schemes_1.getActiveSchemes)();
        const ineligibleSchemes = eligibilityService_1.EligibilityService.getIneligibleSchemes(user, allSchemes);
        res.json({
            success: true,
            data: ineligibleSchemes,
            message: 'Ineligible schemes fetched successfully'
        });
    }
    catch (error) {
        console.error('Get ineligible schemes error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch ineligible schemes'
        });
    }
});
// Get eligibility check for a specific scheme (requires authentication)
router.get('/check/:id', auth_1.authMiddleware, (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const scheme = (0, schemes_1.getSchemeById)(id);
        if (!scheme) {
            return res.status(404).json({
                success: false,
                message: 'Scheme not found'
            });
        }
        const eligibilityResult = eligibilityService_1.EligibilityService.checkEligibility(user, scheme);
        res.json({
            success: true,
            data: eligibilityResult,
            message: 'Eligibility check completed successfully'
        });
    }
    catch (error) {
        console.error('Get eligibility check error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check eligibility'
        });
    }
});
exports.default = router;
//# sourceMappingURL=schemes.js.map