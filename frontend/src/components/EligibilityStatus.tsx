import React, { useState, useEffect } from 'react';
import { schemesAPI } from '../services/api';

interface EligibilityStatusProps {
  schemeId: string;
  compact?: boolean;
}

const EligibilityStatus: React.FC<EligibilityStatusProps> = ({ schemeId, compact = false }) => {
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const response = await schemesAPI.checkSchemeEligibility(schemeId);
        if (response.success) {
          setEligibilityResult(response.data);
        } else {
          setError(response.message || 'Failed to check eligibility');
        }
      } catch (err) {
        setError('Unable to check eligibility. Please login to view eligibility status.');
        console.error('Eligibility check error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEligibility();
  }, [schemeId]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 h-6 rounded w-32 mb-2"></div>
        <div className="bg-gray-200 h-4 rounded w-24"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center">
          <span className="text-yellow-500 mr-2">⚠️</span>
          <span className="text-sm text-yellow-800">{error}</span>
        </div>
      </div>
    );
  }

  if (!eligibilityResult) {
    return null;
  }

  const { isEligible, eligibilityScore, reasons } = eligibilityResult;

  if (compact) {
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isEligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        <span className="mr-1">{isEligible ? '✅' : '❌'}</span>
        {isEligible ? 'Eligible' : 'Not Eligible'}
        <span className="ml-2 text-xs">({eligibilityScore.toFixed(2)}%)</span>
      </div>
    );
  }

  return (
    <div className={`border-2 rounded-lg p-4 ${
      isEligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{isEligible ? '✅' : '❌'}</span>
          <span className={`font-semibold ${
            isEligible ? 'text-green-700' : 'text-red-700'
          }`}>
            {isEligible ? 'You are eligible for this scheme' : 'You are not eligible for this scheme'}
          </span>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          eligibilityScore >= 80 ? 'bg-green-100 text-green-800' :
          eligibilityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {eligibilityScore.toFixed(2)}% Match
        </div>
      </div>

      {/* Reasons */}
      <div className="space-y-2">
        {reasons.eligible.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-green-700 mb-1">✅ Requirements Met:</h4>
            <ul className="text-sm text-green-600 space-y-1">
              {reasons.eligible.map((reason: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {reasons.ineligible.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-red-700 mb-1">❌ Issues Found:</h4>
            <ul className="text-sm text-red-600 space-y-1">
              {reasons.ineligible.map((reason: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {reasons.warnings.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-yellow-700 mb-1">⚠️ Additional Requirements:</h4>
            <ul className="text-sm text-yellow-600 space-y-1">
              {reasons.warnings.map((reason: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {!isEligible && eligibilityResult.recommendations && eligibilityResult.recommendations.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-medium text-blue-700 mb-2">💡 Recommendations:</h4>
          <ul className="text-sm text-blue-600 space-y-1">
            {eligibilityResult.recommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EligibilityStatus; 