import { User, Scheme, EligibilityResult } from '../types';
export interface DetailedEligibilityResult extends EligibilityResult {
    reasons: {
        eligible: string[];
        ineligible: string[];
        warnings: string[];
    };
    eligibilityBreakdown: {
        [key: string]: {
            status: 'eligible' | 'ineligible' | 'partial';
            message: string;
            userValue?: any;
            requiredValue?: any;
        };
    };
}
export declare class EligibilityService {
    static checkEligibility(user: User, scheme: Scheme): DetailedEligibilityResult;
    private static checkAge;
    private static checkGender;
    private static checkOccupation;
    private static checkIncome;
    private static checkState;
    private static checkCustomCriteria;
    private static generateRecommendations;
    static getEligibleSchemes(user: User, schemes: Scheme[]): DetailedEligibilityResult[];
    static getIneligibleSchemes(user: User, schemes: Scheme[]): DetailedEligibilityResult[];
    static getAllSchemesWithEligibility(user: User, schemes: Scheme[]): DetailedEligibilityResult[];
}
//# sourceMappingURL=eligibilityService.d.ts.map