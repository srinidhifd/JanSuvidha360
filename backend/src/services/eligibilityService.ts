import { User, Scheme, EligibilityResult, EligibilityCriteria } from '../types';

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

export class EligibilityService {
  static checkEligibility(user: User, scheme: Scheme): DetailedEligibilityResult {
    const result: DetailedEligibilityResult = {
      schemeId: scheme.id,
      scheme: scheme,
      isEligible: true,
      eligibilityScore: 0,
      matchingCriteria: [],
      missingCriteria: [],
      recommendations: [],
      reasons: {
        eligible: [],
        ineligible: [],
        warnings: []
      },
      eligibilityBreakdown: {}
    };

    const criteria = scheme.eligibilityCriteria;
    let totalCriteria = 0;
    let matchedCriteria = 0;

    // Check Age Criteria
    if (criteria.minAge !== undefined || criteria.maxAge !== undefined) {
      totalCriteria++;
      const ageResult = this.checkAge(user.age, criteria.minAge, criteria.maxAge);
      result.eligibilityBreakdown.age = ageResult;
      
      if (ageResult.status === 'eligible') {
        matchedCriteria++;
        result.reasons.eligible.push(ageResult.message);
      } else {
        result.isEligible = false;
        result.reasons.ineligible.push(ageResult.message);
        result.missingCriteria.push(`Age requirement: ${criteria.minAge || 0}-${criteria.maxAge || 100} years`);
      }
    }

    // Check Gender Criteria
    if (criteria.gender && criteria.gender !== 'all') {
      totalCriteria++;
      const genderResult = this.checkGender(user.gender, criteria.gender);
      result.eligibilityBreakdown.gender = genderResult;
      
      if (genderResult.status === 'eligible') {
        matchedCriteria++;
        result.reasons.eligible.push(genderResult.message);
      } else {
        result.isEligible = false;
        result.reasons.ineligible.push(genderResult.message);
        result.missingCriteria.push(`Gender requirement: ${criteria.gender}`);
      }
    }

    // Check Occupation Criteria
    if (criteria.occupation && criteria.occupation.length > 0) {
      totalCriteria++;
      const occupationResult = this.checkOccupation(user.occupation, criteria.occupation);
      result.eligibilityBreakdown.occupation = occupationResult;
      
      if (occupationResult.status === 'eligible') {
        matchedCriteria++;
        result.reasons.eligible.push(occupationResult.message);
      } else {
        result.isEligible = false;
        result.reasons.ineligible.push(occupationResult.message);
        result.missingCriteria.push(`Occupation requirement: ${criteria.occupation.join(', ')}`);
      }
    }

    // Check Income Criteria
    if (criteria.maxIncome !== undefined || criteria.minIncome !== undefined) {
      totalCriteria++;
      const incomeResult = this.checkIncome(user.annualIncome, criteria.minIncome, criteria.maxIncome);
      result.eligibilityBreakdown.income = incomeResult;
      
      if (incomeResult.status === 'eligible') {
        matchedCriteria++;
        result.reasons.eligible.push(incomeResult.message);
      } else {
        result.isEligible = false;
        result.reasons.ineligible.push(incomeResult.message);
        result.missingCriteria.push(`Income requirement: ${criteria.minIncome || 0} - ${criteria.maxIncome || 'No limit'}`);
      }
    }

    // Check State/Location Criteria
    if (criteria.state && criteria.state.length > 0) {
      totalCriteria++;
      const stateResult = this.checkState(user.state, criteria.state);
      result.eligibilityBreakdown.state = stateResult;
      
      if (stateResult.status === 'eligible') {
        matchedCriteria++;
        result.reasons.eligible.push(stateResult.message);
      } else {
        result.isEligible = false;
        result.reasons.ineligible.push(stateResult.message);
        result.missingCriteria.push(`Location requirement: ${criteria.state.join(', ')}`);
      }
    }

    // Check Custom Criteria
    if (criteria.customCriteria && criteria.customCriteria.length > 0) {
      totalCriteria++;
      const customResult = this.checkCustomCriteria(criteria.customCriteria);
      result.eligibilityBreakdown.customCriteria = customResult;
      
      if (customResult.status === 'partial') {
        result.reasons.warnings.push(customResult.message);
      } else {
        result.reasons.eligible.push(customResult.message);
      }
    }

    // Calculate eligibility score
    result.eligibilityScore = totalCriteria > 0 ? (matchedCriteria / totalCriteria) * 100 : 0;

    // Add recommendations based on missing criteria
    if (!result.isEligible) {
      result.recommendations = this.generateRecommendations(result.missingCriteria, user);
    }

    // Set matching criteria
    result.matchingCriteria = result.reasons.eligible;

    return result;
  }

  private static checkAge(userAge: number, minAge?: number, maxAge?: number): any {
    if (minAge !== undefined && maxAge !== undefined) {
      if (userAge >= minAge && userAge <= maxAge) {
        return {
          status: 'eligible',
          message: `Age requirement met (${userAge} years is within ${minAge}-${maxAge} years range)`,
          userValue: userAge,
          requiredValue: `${minAge}-${maxAge} years`
        };
      } else {
        return {
          status: 'ineligible',
          message: `Age requirement not met (${userAge} years is outside ${minAge}-${maxAge} years range)`,
          userValue: userAge,
          requiredValue: `${minAge}-${maxAge} years`
        };
      }
    } else if (minAge !== undefined) {
      if (userAge >= minAge) {
        return {
          status: 'eligible',
          message: `Age requirement met (${userAge} years is above minimum ${minAge} years)`,
          userValue: userAge,
          requiredValue: `Minimum ${minAge} years`
        };
      } else {
        return {
          status: 'ineligible',
          message: `Age requirement not met (${userAge} years is below minimum ${minAge} years)`,
          userValue: userAge,
          requiredValue: `Minimum ${minAge} years`
        };
      }
    } else if (maxAge !== undefined) {
      if (userAge <= maxAge) {
        return {
          status: 'eligible',
          message: `Age requirement met (${userAge} years is below maximum ${maxAge} years)`,
          userValue: userAge,
          requiredValue: `Maximum ${maxAge} years`
        };
      } else {
        return {
          status: 'ineligible',
          message: `Age requirement not met (${userAge} years is above maximum ${maxAge} years)`,
          userValue: userAge,
          requiredValue: `Maximum ${maxAge} years`
        };
      }
    }
    return { status: 'eligible', message: 'No age restriction' };
  }

  private static checkGender(userGender: string, requiredGender: string): any {
    if (userGender === requiredGender) {
      return {
        status: 'eligible',
        message: `Gender requirement met (${userGender})`,
        userValue: userGender,
        requiredValue: requiredGender
      };
    } else {
      return {
        status: 'ineligible',
        message: `This scheme is only available for ${requiredGender} applicants`,
        userValue: userGender,
        requiredValue: requiredGender
      };
    }
  }

  private static checkOccupation(userOccupation: string, requiredOccupations: string[]): any {
    if (requiredOccupations.includes(userOccupation)) {
      return {
        status: 'eligible',
        message: `Occupation requirement met (${userOccupation})`,
        userValue: userOccupation,
        requiredValue: requiredOccupations
      };
    } else {
      return {
        status: 'ineligible',
        message: `Occupation requirement not met. Required: ${requiredOccupations.join(', ')}. Your occupation: ${userOccupation}`,
        userValue: userOccupation,
        requiredValue: requiredOccupations
      };
    }
  }

  private static checkIncome(userIncome: number, minIncome?: number, maxIncome?: number): any {
    if (minIncome !== undefined && maxIncome !== undefined) {
      if (userIncome >= minIncome && userIncome <= maxIncome) {
        return {
          status: 'eligible',
          message: `Income requirement met (₹${userIncome.toLocaleString()} is within ₹${minIncome.toLocaleString()}-₹${maxIncome.toLocaleString()} range)`,
          userValue: userIncome,
          requiredValue: `₹${minIncome.toLocaleString()}-₹${maxIncome.toLocaleString()}`
        };
      } else {
        return {
          status: 'ineligible',
          message: `Income requirement not met (₹${userIncome.toLocaleString()} is outside ₹${minIncome.toLocaleString()}-₹${maxIncome.toLocaleString()} range)`,
          userValue: userIncome,
          requiredValue: `₹${minIncome.toLocaleString()}-₹${maxIncome.toLocaleString()}`
        };
      }
    } else if (maxIncome !== undefined) {
      if (userIncome <= maxIncome) {
        return {
          status: 'eligible',
          message: `Income requirement met (₹${userIncome.toLocaleString()} is below maximum ₹${maxIncome.toLocaleString()})`,
          userValue: userIncome,
          requiredValue: `Maximum ₹${maxIncome.toLocaleString()}`
        };
      } else {
        return {
          status: 'ineligible',
          message: `Income too high (₹${userIncome.toLocaleString()} exceeds maximum ₹${maxIncome.toLocaleString()})`,
          userValue: userIncome,
          requiredValue: `Maximum ₹${maxIncome.toLocaleString()}`
        };
      }
    } else if (minIncome !== undefined) {
      if (userIncome >= minIncome) {
        return {
          status: 'eligible',
          message: `Income requirement met (₹${userIncome.toLocaleString()} is above minimum ₹${minIncome.toLocaleString()})`,
          userValue: userIncome,
          requiredValue: `Minimum ₹${minIncome.toLocaleString()}`
        };
      } else {
        return {
          status: 'ineligible',
          message: `Income too low (₹${userIncome.toLocaleString()} is below minimum ₹${minIncome.toLocaleString()})`,
          userValue: userIncome,
          requiredValue: `Minimum ₹${minIncome.toLocaleString()}`
        };
      }
    }
    return { status: 'eligible', message: 'No income restriction' };
  }

  private static checkState(userState: string, requiredStates: string[]): any {
    if (requiredStates.includes(userState)) {
      return {
        status: 'eligible',
        message: `Location requirement met (${userState})`,
        userValue: userState,
        requiredValue: requiredStates
      };
    } else {
      return {
        status: 'ineligible',
        message: `Location requirement not met. This scheme is only available in: ${requiredStates.join(', ')}. Your location: ${userState}`,
        userValue: userState,
        requiredValue: requiredStates
      };
    }
  }

  private static checkCustomCriteria(customCriteria: string[]): any {
    return {
      status: 'partial',
      message: `Additional requirements: ${customCriteria.join(', ')}`,
      userValue: 'To be verified',
      requiredValue: customCriteria
    };
  }

  private static generateRecommendations(missingCriteria: string[], user: User): string[] {
    const recommendations: string[] = [];
    
    missingCriteria.forEach(criteria => {
      if (criteria.includes('Age')) {
        recommendations.push('Consider waiting until you meet the age requirement or look for schemes with different age criteria');
      } else if (criteria.includes('Gender')) {
        recommendations.push('Look for schemes that are open to all genders or specifically designed for your gender');
      } else if (criteria.includes('Occupation')) {
        recommendations.push('Consider changing your occupation status or look for schemes matching your current occupation');
      } else if (criteria.includes('Income')) {
        recommendations.push('Look for schemes with different income brackets or consider income-adjusting measures');
      } else if (criteria.includes('Location')) {
        recommendations.push('Look for central government schemes or schemes available in your state');
      }
    });

    return recommendations;
  }

  static getEligibleSchemes(user: User, schemes: Scheme[]): DetailedEligibilityResult[] {
    return schemes
      .map(scheme => this.checkEligibility(user, scheme))
      .filter(result => result.isEligible)
      .sort((a, b) => b.eligibilityScore - a.eligibilityScore);
  }

  static getIneligibleSchemes(user: User, schemes: Scheme[]): DetailedEligibilityResult[] {
    return schemes
      .map(scheme => this.checkEligibility(user, scheme))
      .filter(result => !result.isEligible)
      .sort((a, b) => b.eligibilityScore - a.eligibilityScore);
  }

  static getAllSchemesWithEligibility(user: User, schemes: Scheme[]): DetailedEligibilityResult[] {
    return schemes
      .map(scheme => this.checkEligibility(user, scheme))
      .sort((a, b) => {
        if (a.isEligible && !b.isEligible) return -1;
        if (!a.isEligible && b.isEligible) return 1;
        return b.eligibilityScore - a.eligibilityScore;
      });
  }
} 