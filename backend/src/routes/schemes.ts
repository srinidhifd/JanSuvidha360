import express from 'express';
import { getActiveSchemes, getSchemeById, getSchemesByCategory } from '../data/schemes';
import { EligibilityService } from '../services/eligibilityService';
import { authMiddleware } from '../middleware/auth';
import { ApiResponse, User } from '../types';

const router = express.Router();

// Get all active schemes
router.get('/', (req: express.Request, res: express.Response) => {
  try {
    const schemes = getActiveSchemes();
    
    res.json({
      success: true,
      data: schemes,
      message: 'Schemes fetched successfully'
    } as ApiResponse<typeof schemes>);
    
  } catch (error) {
    console.error('Get schemes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch schemes'
    } as ApiResponse<null>);
  }
});

// Get scheme by ID
router.get('/:id', (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const scheme = getSchemeById(id);
    
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      } as ApiResponse<null>);
    }
    
    res.json({
      success: true,
      data: scheme,
      message: 'Scheme fetched successfully'
    } as ApiResponse<typeof scheme>);
    
  } catch (error) {
    console.error('Get scheme by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scheme'
    } as ApiResponse<null>);
  }
});

// Get schemes by category
router.get('/category/:category', (req: express.Request, res: express.Response) => {
  try {
    const { category } = req.params;
    const schemes = getSchemesByCategory(category);
    
    res.json({
      success: true,
      data: schemes,
      message: `Schemes in ${category} category fetched successfully`
    } as ApiResponse<typeof schemes>);
    
  } catch (error) {
    console.error('Get schemes by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch schemes by category'
    } as ApiResponse<null>);
  }
});

// Get user's eligible schemes (requires authentication)
router.get('/eligible/me', authMiddleware, (req: express.Request, res: express.Response) => {
  try {
    const user = (req as any).user as User;
    const allSchemes = getActiveSchemes();
    const eligibleSchemes = EligibilityService.getEligibleSchemes(user, allSchemes);
    
    res.json({
      success: true,
      data: eligibleSchemes,
      message: 'Eligible schemes fetched successfully'
    } as ApiResponse<typeof eligibleSchemes>);
    
  } catch (error) {
    console.error('Get eligible schemes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch eligible schemes'
    } as ApiResponse<null>);
  }
});

// Get user's eligibility for all schemes (requires authentication)
router.get('/eligibility/me', authMiddleware, (req: express.Request, res: express.Response) => {
  try {
    const user = (req as any).user as User;
    const allSchemes = getActiveSchemes();
    const eligibilityResults = EligibilityService.getAllSchemesWithEligibility(user, allSchemes);
    
    res.json({
      success: true,
      data: eligibilityResults,
      message: 'Eligibility results fetched successfully'
    } as ApiResponse<typeof eligibilityResults>);
    
  } catch (error) {
    console.error('Get eligibility results error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch eligibility results'
    } as ApiResponse<null>);
  }
});

// Get ineligible schemes for user (requires authentication)
router.get('/ineligible/me', authMiddleware, (req: express.Request, res: express.Response) => {
  try {
    const user = (req as any).user as User;
    const allSchemes = getActiveSchemes();
    const ineligibleSchemes = EligibilityService.getIneligibleSchemes(user, allSchemes);
    
    res.json({
      success: true,
      data: ineligibleSchemes,
      message: 'Ineligible schemes fetched successfully'
    } as ApiResponse<typeof ineligibleSchemes>);
    
  } catch (error) {
    console.error('Get ineligible schemes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ineligible schemes'
    } as ApiResponse<null>);
  }
});

// Get eligibility check for a specific scheme (requires authentication)
router.get('/check/:id', authMiddleware, (req: express.Request, res: express.Response) => {
  try {
    const user = (req as any).user as User;
    const { id } = req.params;
    const scheme = getSchemeById(id);
    
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      } as ApiResponse<null>);
    }
    
    const eligibilityResult = EligibilityService.checkEligibility(user, scheme);
    
    res.json({
      success: true,
      data: eligibilityResult,
      message: 'Eligibility check completed successfully'
    } as ApiResponse<typeof eligibilityResult>);
    
  } catch (error) {
    console.error('Get eligibility check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check eligibility'
    } as ApiResponse<null>);
  }
});

export default router; 