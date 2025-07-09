import React, { useState } from 'react';
import { Scheme } from '../types';

interface EligibilityResult {
  schemeId: string;
  scheme: Scheme;
  isEligible: boolean;
  eligibilityScore: number;
  matchingCriteria: string[];
  missingCriteria: string[];
  recommendations?: string[];
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

interface EligibilityCardProps {
  eligibilityResult: EligibilityResult;
  onApply?: (schemeId: string) => void;
  showDetails?: boolean;
}

const EligibilityCard: React.FC<EligibilityCardProps> = ({ 
  eligibilityResult, 
  onApply, 
  showDetails = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { scheme, isEligible, eligibilityScore, reasons, eligibilityBreakdown } = eligibilityResult;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ineligible':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'eligible':
        return '✅';
      case 'ineligible':
        return '❌';
      case 'partial':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const getEligibilityBadge = () => {
    if (isEligible) {
      return (
        <div className="flex items-center space-x-2 text-green-600">
          <span className="text-lg">✅</span>
          <span className="font-semibold">Eligible</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2 text-red-600">
          <span className="text-lg">❌</span>
          <span className="font-semibold">Not Eligible</span>
        </div>
      );
    }
  };

  return (
    <div className={`border-2 rounded-xl p-6 transition-all duration-200 ${
      isEligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
          <div className="flex items-center justify-between">
            {getEligibilityBadge()}
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                eligibilityScore >= 80 ? 'bg-green-100 text-green-800' :
                eligibilityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                                 {eligibilityScore.toFixed(2)}% Match
              </div>
              <span className="text-sm text-gray-500">{scheme.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {reasons.eligible.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-600">✅</span>
              <span className="text-sm font-medium text-green-800">
                {reasons.eligible.length} Criteria Met
              </span>
            </div>
            <ul className="text-xs text-green-700 space-y-1">
              {reasons.eligible.slice(0, 2).map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
              {reasons.eligible.length > 2 && (
                <li className="text-green-600">+{reasons.eligible.length - 2} more</li>
              )}
            </ul>
          </div>
        )}

        {reasons.ineligible.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-red-600">❌</span>
              <span className="text-sm font-medium text-red-800">
                {reasons.ineligible.length} Issues Found
              </span>
            </div>
            <ul className="text-xs text-red-700 space-y-1">
              {reasons.ineligible.slice(0, 2).map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
              {reasons.ineligible.length > 2 && (
                <li className="text-red-600">+{reasons.ineligible.length - 2} more</li>
              )}
            </ul>
          </div>
        )}

        {reasons.warnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-yellow-600">⚠️</span>
              <span className="text-sm font-medium text-yellow-800">
                Additional Requirements
              </span>
            </div>
            <ul className="text-xs text-yellow-700 space-y-1">
              {reasons.warnings.slice(0, 2).map((reason, index) => (
                <li key={index}>• {reason}</li>
              ))}
              {reasons.warnings.length > 2 && (
                <li className="text-yellow-600">+{reasons.warnings.length - 2} more</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          {isExpanded ? '▲ Hide Details' : '▼ Show Details'}
        </button>
        
        <div className="flex items-center space-x-3">
          {!isEligible && eligibilityResult.recommendations && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">💡 Tips available</span>
            </div>
          )}
          
          {isEligible ? (
            <button
              onClick={() => onApply?.(scheme.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Apply Now
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
            >
              Not Eligible
            </button>
          )}
        </div>
      </div>

      {/* Detailed Information */}
      {isExpanded && (
        <div className="mt-6 border-t pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Eligibility Breakdown */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Eligibility Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(eligibilityBreakdown).map(([key, breakdown]) => (
                  <div key={key} className={`p-3 rounded-lg border ${getStatusColor(breakdown.status)}`}>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{getStatusIcon(breakdown.status)}</span>
                      <div className="flex-1">
                        <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-sm mt-1">{breakdown.message}</div>
                        {breakdown.userValue && breakdown.requiredValue && (
                          <div className="text-xs mt-2 space-y-1">
                            <div>Your Value: <span className="font-medium">{breakdown.userValue}</span></div>
                            <div>Required: <span className="font-medium">{breakdown.requiredValue}</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {!isEligible && eligibilityResult.recommendations && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                <div className="space-y-3">
                  {eligibilityResult.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">💡</span>
                        <div className="text-sm text-blue-800">{recommendation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scheme Details */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-3">Scheme Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Department:</span> {scheme.department}
              </div>
              <div>
                <span className="font-medium">Processing Time:</span> {scheme.processingTime}
              </div>
              <div>
                <span className="font-medium">Application Fee:</span> {scheme.applicationFee === 0 ? 'Free' : `₹${scheme.applicationFee}`}
              </div>
              {scheme.helplineNumber && (
                <div>
                  <span className="font-medium">Helpline:</span> {scheme.helplineNumber}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityCard; 