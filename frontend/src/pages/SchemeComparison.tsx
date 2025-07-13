import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { schemesAPI } from '../services/api';
import { Scheme } from '../types';
import Loading from '../components/Loading';

interface ComparisonScheme extends Scheme {
  eligibilityResult?: {
    isEligible: boolean;
    eligibilityScore: number;
    matchingCriteria: string[];
    missingCriteria: string[];
  };
}

const SchemeComparison: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedSchemes, setSelectedSchemes] = useState<ComparisonScheme[]>([]);
  const [availableSchemes, setAvailableSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [comparisonView, setComparisonView] = useState<'overview' | 'eligibility' | 'benefits' | 'process'>('overview');

  // Get scheme IDs from URL params for pre-selected comparison
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const schemeIds = params.get('schemes')?.split(',') || [];
    
    fetchSchemes(schemeIds);
  }, [location.search]);

  const fetchSchemes = async (preSelectedIds: string[] = []) => {
    setLoading(true);
    try {
      const response = await schemesAPI.getAllSchemes();
      if (response.success && response.data) {
        setAvailableSchemes(response.data);
        
        // Pre-select schemes if IDs are provided
        if (preSelectedIds.length > 0) {
          const preSelected = response.data.filter(scheme => 
            preSelectedIds.includes(scheme.id)
          ).slice(0, 3); // Maximum 3 schemes
          
          // Mock eligibility results for pre-selected schemes
          const schemesWithEligibility = preSelected.map(scheme => ({
            ...scheme,
            eligibilityResult: mockEligibilityResult(scheme)
          }));
          
          setSelectedSchemes(schemesWithEligibility);
        }
      }
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock eligibility calculation
  const mockEligibilityResult = (scheme: Scheme) => {
    const mockResults = {
      'pm-kisan': {
        isEligible: true,
        eligibilityScore: 95,
        matchingCriteria: ['Age requirement met', 'Occupation matches', 'Income within limits'],
        missingCriteria: []
      },
      'ayushman-bharat': {
        isEligible: false,
        eligibilityScore: 45,
        matchingCriteria: ['Age requirement met'],
        missingCriteria: ['Income exceeds limit', 'Not in eligible family category']
      },
      'nsp-scholarship': {
        isEligible: true,
        eligibilityScore: 88,
        matchingCriteria: ['Age requirement met', 'Occupation matches', 'Income within limits'],
        missingCriteria: []
      },
      'mudra-loan': {
        isEligible: true,
        eligibilityScore: 92,
        matchingCriteria: ['Age requirement met', 'Occupation matches'],
        missingCriteria: []
      },
      'pmay-urban': {
        isEligible: false,
        eligibilityScore: 60,
        matchingCriteria: ['Age requirement met', 'Location matches'],
        missingCriteria: ['Income exceeds limit', 'Already owns property']
      }
    };
    
    return (mockResults as Record<string, any>)[scheme.id] || {
      isEligible: false,
      eligibilityScore: 50,
      matchingCriteria: ['Age requirement met'],
      missingCriteria: ['Income verification needed']
    };
  };

  const addSchemeToComparison = (scheme: Scheme) => {
    if (selectedSchemes.length < 3 && !selectedSchemes.some(s => s.id === scheme.id)) {
      const schemeWithEligibility = {
        ...scheme,
        eligibilityResult: mockEligibilityResult(scheme)
      };
      setSelectedSchemes([...selectedSchemes, schemeWithEligibility]);
      
      // Update URL
      const schemeIds = [...selectedSchemes.map(s => s.id), scheme.id];
      navigate(`/comparison?schemes=${schemeIds.join(',')}`);
    }
  };

  const removeSchemeFromComparison = (schemeId: string) => {
    const updated = selectedSchemes.filter(s => s.id !== schemeId);
    setSelectedSchemes(updated);
    
    // Update URL
    if (updated.length > 0) {
      const schemeIds = updated.map(s => s.id);
      navigate(`/comparison?schemes=${schemeIds.join(',')}`);
    } else {
      navigate('/comparison');
    }
  };

  const clearComparison = () => {
    setSelectedSchemes([]);
    navigate('/comparison');
  };

  const getEligibilityColor = (result: any) => {
    if (result.isEligible) return 'text-green-600';
    if (result.eligibilityScore > 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEligibilityIcon = (result: any) => {
    if (result.isEligible) return '✅';
    if (result.eligibilityScore > 70) return '⚠️';
    return '❌';
  };

  const formatBenefit = (benefit: string) => {
    return benefit.length > 50 ? benefit.substring(0, 50) + '...' : benefit;
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-100/10 to-indigo-100/10"></div>
        </div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Scheme Comparison Tool</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Compare up to 3 government schemes side by side to make informed decisions
            </p>
          </div>
        </div>

        {/* Scheme Selection */}
        {selectedSchemes.length < 3 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Schemes to Compare</h2>
              <div className="text-sm text-gray-600">
                {selectedSchemes.length}/3 schemes selected
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableSchemes
                .filter(scheme => !selectedSchemes.some(s => s.id === scheme.id))
                .slice(0, 6)
                .map((scheme) => (
                <div key={scheme.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-sm">{scheme.name}</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {scheme.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {scheme.description?.substring(0, 100)}...
                  </p>
                  <button
                    onClick={() => addSchemeToComparison(scheme)}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                  >
                    Add to Compare
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/schemes" className="text-blue-600 hover:text-blue-800 font-medium">
                Browse All Schemes →
              </Link>
            </div>
          </div>
        )}

        {/* Comparison View */}
        {selectedSchemes.length > 0 && (
          <>
            {/* Comparison Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-gray-900">Comparing {selectedSchemes.length} Schemes</h2>
                  <button
                    onClick={clearComparison}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {['overview', 'eligibility', 'benefits', 'process'].map((view) => (
                    <button
                      key={view}
                      onClick={() => setComparisonView(view as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        comparisonView === view
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 w-1/4">
                        Comparison Criteria
                      </th>
                      {selectedSchemes.map((scheme) => (
                        <th key={scheme.id} className="px-6 py-4 text-center text-sm font-bold text-gray-900">
                          <div className="space-y-2">
                            <div className="font-bold">{scheme.name}</div>
                            <div className="flex items-center justify-center space-x-2">
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {scheme.category}
                              </span>
                              <button
                                onClick={() => removeSchemeFromComparison(scheme.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Overview Comparison */}
                    {comparisonView === 'overview' && (
                      <>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Department</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.department}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">Description</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.description?.substring(0, 150)}...
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Launch Date</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.launchDate ? new Date(scheme.launchDate).toLocaleDateString() : 'N/A'}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">Status</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                scheme.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {scheme.status}
                              </span>
                            </td>
                          ))}
                        </tr>
                      </>
                    )}

                    {/* Eligibility Comparison */}
                    {comparisonView === 'eligibility' && (
                      <>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Your Eligibility</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center">
                              <div className="space-y-2">
                                <div className={`font-bold ${getEligibilityColor(scheme.eligibilityResult)}`}>
                                  {getEligibilityIcon(scheme.eligibilityResult)} {scheme.eligibilityResult?.isEligible ? 'Eligible' : 'Not Eligible'}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {scheme.eligibilityResult?.eligibilityScore}% match
                                </div>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">Age Requirement</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.eligibilityCriteria.minAge || 0} - {scheme.eligibilityCriteria.maxAge || 100} years
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Income Limit</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.eligibilityCriteria.maxIncome ? 
                                `₹${scheme.eligibilityCriteria.maxIncome.toLocaleString()}` : 'No Limit'}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">Occupation</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.eligibilityCriteria.occupation?.join(', ') || 'Any'}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Matching Criteria</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm">
                              <div className="space-y-1">
                                {scheme.eligibilityResult?.matchingCriteria.slice(0, 3).map((criteria, index) => (
                                  <div key={index} className="text-green-600 text-xs">
                                    ✓ {criteria}
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </>
                    )}

                    {/* Benefits Comparison */}
                    {comparisonView === 'benefits' && (
                      <>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Primary Benefits</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm">
                              <div className="space-y-1">
                                {scheme.benefits?.slice(0, 3).map((benefit, index) => (
                                  <div key={index} className="text-gray-600 text-xs">
                                    • {formatBenefit(benefit)}
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">Application Fee</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.applicationFee === 0 ? 'Free' : `₹${scheme.applicationFee}`}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Processing Time</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.processingTime}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">Helpline</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm text-gray-600">
                              {scheme.helplineNumber || 'N/A'}
                            </td>
                          ))}
                        </tr>
                      </>
                    )}

                    {/* Application Process Comparison */}
                    {comparisonView === 'process' && (
                      <>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Application Steps</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm">
                              <div className="space-y-1">
                                {scheme.applicationProcess?.slice(0, 4).map((step, index) => (
                                  <div key={index} className="text-gray-600 text-xs text-left">
                                    {index + 1}. {step.substring(0, 50)}...
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">Required Documents</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm">
                              <div className="space-y-1">
                                {scheme.documentsRequired?.slice(0, 4).map((doc, index) => (
                                  <div key={index} className="text-gray-600 text-xs">
                                    • {doc}
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-gray-900">Official Website</td>
                          {selectedSchemes.map((scheme) => (
                            <td key={scheme.id} className="px-6 py-4 text-center text-sm">
                              {scheme.officialWebsite ? (
                                <a
                                  href={scheme.officialWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  Apply Online →
                                </a>
                              ) : (
                                <span className="text-gray-500">N/A</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  Compare schemes to make informed decisions about which benefits suit you best
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                    Export Comparison
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Save Comparison
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {selectedSchemes.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-12">
            <div className="text-center">
              <div className="text-6xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Comparing Schemes</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Select up to 3 government schemes to compare their benefits, eligibility criteria, 
                and application processes side by side.
              </p>
              <Link
                to="/schemes"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Browse Schemes to Compare
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeComparison; 