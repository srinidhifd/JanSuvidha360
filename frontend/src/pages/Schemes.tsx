import React, { useState, useEffect } from 'react';
import { schemesAPI } from '../services/api';
import { Scheme } from '../types';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import EligibilityCard from '../components/EligibilityCard';
import { useAuth } from '../contexts/AuthContext';

const Schemes: React.FC = () => {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEligibility, setSelectedEligibility] = useState('all');
  const [viewMode, setViewMode] = useState<'eligibility' | 'basic'>('eligibility');

  const categories = [
    { value: 'all', label: 'All Categories', icon: '📋' },
    { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { value: 'education', label: 'Education', icon: '🎓' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'housing', label: 'Housing', icon: '🏠' },
    { value: 'employment', label: 'Employment', icon: '💼' },
    { value: 'social-security', label: 'Social Security', icon: '🛡️' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'women', label: 'Women', icon: '👩' },
    { value: 'senior-citizen', label: 'Senior Citizen', icon: '👴' },
    { value: 'youth', label: 'Youth', icon: '👦' }
  ];

  const eligibilityFilters = [
    { value: 'all', label: 'All Schemes' },
    { value: 'eligible', label: 'Eligible Only' },
    { value: 'ineligible', label: 'Not Eligible' },
    { value: 'high-match', label: 'High Match (80%+)' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch eligibility results first (requires auth)
        try {
          const eligibilityResponse = await schemesAPI.getEligibilityResults();
          if (eligibilityResponse.success) {
            setEligibilityResults(eligibilityResponse.data || []);
            setViewMode('eligibility');
          }
        } catch (eligibilityError) {
          console.log('User not authenticated, falling back to basic view');
          // Fall back to basic schemes view
          const schemesResponse = await schemesAPI.getAllSchemes();
          if (schemesResponse.success) {
            setSchemes(schemesResponse.data || []);
            setViewMode('basic');
          }
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Schemes error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResults = eligibilityResults.filter(result => {
    const scheme = result.scheme;
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    
    let matchesEligibility = true;
    if (selectedEligibility === 'eligible') {
      matchesEligibility = result.isEligible;
    } else if (selectedEligibility === 'ineligible') {
      matchesEligibility = !result.isEligible;
    } else if (selectedEligibility === 'high-match') {
      matchesEligibility = result.eligibilityScore >= 80;
    }
    
    return matchesSearch && matchesCategory && matchesEligibility;
  });

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleApply = (schemeId: string) => {
    // Navigate to application page or show application modal
    window.location.href = `/schemes/${schemeId}`;
  };

  const getEligibilityStats = () => {
    if (viewMode === 'basic') return null;
    
    const total = eligibilityResults.length;
    const eligible = eligibilityResults.filter(r => r.isEligible).length;
    const ineligible = total - eligible;
    const highMatch = eligibilityResults.filter(r => r.eligibilityScore >= 80).length;
    
    return { total, eligible, ineligible, highMatch };
  };

  const stats = getEligibilityStats();

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="pt-2 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Schemes</h1>
        <p className="text-gray-600 text-base">Discover government schemes personalized for you</p>
      </div>
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-500 mr-3">⚠️</span>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {viewMode === 'eligibility' && stats ? (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Schemes</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Eligible</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.eligible}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Not Eligible</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{stats.ineligible}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">❌</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Match</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{stats.highMatch}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Schemes</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{schemes.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {schemes.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {new Set(schemes.map(s => s.category)).size}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Filtered</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{filteredSchemes.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔍</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Search & Filter</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Schemes</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {viewMode === 'eligibility' ? 'Eligibility' : 'Status'}
            </label>
            {viewMode === 'eligibility' ? (
              <select
                value={selectedEligibility}
                onChange={(e) => setSelectedEligibility(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {eligibilityFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            ) : (
              <select
                value="all"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            )}
          </div>
        </div>

        {(searchTerm || selectedCategory !== 'all' || selectedEligibility !== 'all') && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">
                {viewMode === 'eligibility' ? filteredResults.length : filteredSchemes.length}
              </span> of <span className="font-medium">
                {viewMode === 'eligibility' ? eligibilityResults.length : schemes.length}
              </span> schemes
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedEligibility('all');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Schemes Display */}
      <div className="space-y-6">
        {viewMode === 'eligibility' ? (
          // Eligibility-aware display
          filteredResults.map((result) => (
            <EligibilityCard
              key={result.schemeId}
              eligibilityResult={result}
              onApply={handleApply}
            />
          ))
        ) : (
          // Basic schemes display
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group flex flex-col h-full">
                <div className="p-6 pb-4 flex-shrink-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                      📋
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {scheme.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {scheme.name}
                  </h3>
                </div>

                <div className="px-6 pb-4 flex-grow">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{scheme.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Department:</span>
                      <span className="font-medium text-gray-900">{scheme.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Processing:</span>
                      <span className="font-medium text-gray-900">{scheme.processingTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Fee:</span>
                      <span className="font-medium text-green-600">₹{scheme.applicationFee}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-gray-100 flex-shrink-0">
                  <Link
                    to={`/schemes/${scheme.id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 text-center block shadow-md hover:shadow-lg transform hover:scale-105 group-hover:scale-105"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced No Results */}
      {((viewMode === 'eligibility' && filteredResults.length === 0) || 
        (viewMode === 'basic' && filteredSchemes.length === 0)) && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📋</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Schemes Found</h3>
          <p className="text-gray-600 mb-4">
            {viewMode === 'eligibility' 
              ? 'Try adjusting your eligibility filters or search criteria.'
              : 'Try adjusting your search criteria or filters.'}
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedEligibility('all');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Schemes; 