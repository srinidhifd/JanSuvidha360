import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { schemesAPI } from '../services/api';
import { Scheme } from '../types';
import Loading from '../components/Loading';
import EligibilityCard from '../components/EligibilityCard';

const SearchResults: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState<'all' | 'schemes' | 'documents' | 'help'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'category' | 'eligibility'>('relevance');
  const [filters, setFilters] = useState({
    category: 'all',
    eligibility: 'all',
    benefitRange: 'all',
    department: 'all'
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock search suggestions
  const searchSuggestions = [
    'PM-KISAN scheme',
    'Ayushman Bharat eligibility',
    'Scholarship for students',
    'Housing loan subsidy',
    'Farmer welfare schemes',
    'Healthcare insurance',
    'Education loan',
    'Business loan MUDRA',
    'Women empowerment schemes',
    'Senior citizen benefits'
  ];

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'housing', label: 'Housing' },
    { value: 'business', label: 'Business' },
    { value: 'women', label: 'Women' },
    { value: 'senior-citizen', label: 'Senior Citizen' },
    { value: 'employment', label: 'Employment' },
    { value: 'social-security', label: 'Social Security' }
  ];

  // Get search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock search results
      const mockResults = [
        {
          type: 'scheme',
          id: 'pm-kisan',
          title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
          description: 'Income support scheme for farmers providing ₹6000 per year in three equal installments',
          category: 'agriculture',
          department: 'Ministry of Agriculture and Farmers Welfare',
          relevance: 95,
          eligibility: 'eligible',
          benefits: '₹6,000/year',
          url: '/schemes/pm-kisan'
        },
        {
          type: 'scheme',
          id: 'ayushman-bharat',
          title: 'Ayushman Bharat - PM-JAY',
          description: 'Health insurance scheme providing coverage up to ₹5 lakh per family per year',
          category: 'healthcare',
          department: 'Ministry of Health and Family Welfare',
          relevance: 88,
          eligibility: 'not-eligible',
          benefits: '₹5 lakh coverage',
          url: '/schemes/ayushman-bharat'
        },
        {
          type: 'scheme',
          id: 'nsp-scholarship',
          title: 'National Scholarship Portal - Merit Scholarship',
          description: 'Merit-based scholarship for students pursuing higher education',
          category: 'education',
          department: 'Ministry of Education',
          relevance: 82,
          eligibility: 'eligible',
          benefits: '₹20,000/year',
          url: '/schemes/nsp-scholarship'
        },
        {
          type: 'document',
          id: 'aadhaar-guide',
          title: 'How to Upload Aadhaar Card',
          description: 'Step-by-step guide to upload and verify your Aadhaar card',
          category: 'help',
          relevance: 75,
          url: '/help#guides'
        },
        {
          type: 'help',
          id: 'eligibility-faq',
          title: 'How to Check Scheme Eligibility',
          description: 'Frequently asked questions about scheme eligibility checking',
          category: 'help',
          relevance: 70,
          url: '/help#faq'
        }
      ];

      // Filter results based on current filters
      let filteredResults = mockResults.filter(result => {
        if (searchType !== 'all' && result.type !== searchType) return false;
        if (filters.category !== 'all' && result.category !== filters.category) return false;
        if (filters.eligibility !== 'all' && result.eligibility !== filters.eligibility) return false;
        return true;
      });

      // Sort results
      filteredResults.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.title.localeCompare(b.title);
          case 'category':
            return a.category.localeCompare(b.category);
          case 'eligibility':
            return (b.eligibility === 'eligible' ? 1 : 0) - (a.eligibility === 'eligible' ? 1 : 0);
          case 'relevance':
          default:
            return b.relevance - a.relevance;
        }
      });

      setResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      eligibility: 'all',
      benefitRange: 'all',
      department: 'all'
    });
    setSortBy('relevance');
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'scheme': return '🎯';
      case 'document': return '📄';
      case 'help': return '❓';
      default: return '📋';
    }
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case 'scheme': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-green-100 text-green-800';
      case 'help': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case 'eligible': return 'bg-green-100 text-green-800';
      case 'not-eligible': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-100/10 to-indigo-100/10"></div>
        </div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Search Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    placeholder="Search schemes, documents, or help..."
                    className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Search
                </button>
              </div>

              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-700">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Type and Filters */}
            <div className="flex flex-wrap items-center justify-between space-y-2">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Search in:</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Results</option>
                  <option value="schemes">Schemes Only</option>
                  <option value="documents">Documents Only</option>
                  <option value="help">Help & Support</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <span>Filters</span>
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                  <option value="eligibility">Sort by Eligibility</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
                    <select
                      value={filters.eligibility}
                      onChange={(e) => handleFilterChange('eligibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">All Results</option>
                      <option value="eligible">Eligible Only</option>
                      <option value="not-eligible">Not Eligible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefit Range</label>
                    <select
                      value={filters.benefitRange}
                      onChange={(e) => handleFilterChange('benefitRange', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">All Amounts</option>
                      <option value="low">Under ₹10,000</option>
                      <option value="medium">₹10,000 - ₹1,00,000</option>
                      <option value="high">Above ₹1,00,000</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
          {loading ? (
            <div className="p-12">
              <Loading />
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchQuery ? (
                    <>Search Results for "{searchQuery}"</>
                  ) : (
                    <>Search Results</>
                  )}
                </h2>
                <span className="text-sm text-gray-600">
                  {results.length} results found
                </span>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery ? (
                      <>No results found for "{searchQuery}". Try different keywords or filters.</>
                    ) : (
                      <>Enter a search query to find schemes, documents, or help topics.</>
                    )}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-gray-500">Try searching for:</span>
                    {['PM-KISAN', 'Ayushman Bharat', 'Scholarship', 'Housing loan'].map(term => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getResultIcon(result.type)}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getResultTypeColor(result.type)}`}>
                              {result.type}
                            </span>
                            {result.category && (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                {result.category}
                              </span>
                            )}
                            {result.eligibility && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEligibilityColor(result.eligibility)}`}>
                                {result.eligibility === 'eligible' ? 'Eligible' : 'Not Eligible'}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {result.relevance}% match
                          </div>
                          {result.benefits && (
                            <div className="text-sm font-medium text-green-600">
                              {result.benefits}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          <Link to={result.url} className="hover:text-blue-600 transition-colors duration-200">
                            {result.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-2">{result.description}</p>
                        {result.department && (
                          <p className="text-sm text-gray-500">{result.department}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Link
                            to={result.url}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Details →
                          </Link>
                          {result.type === 'scheme' && (
                            <button className="text-gray-600 hover:text-gray-800 text-sm">
                              Save for Later
                            </button>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {result.type === 'scheme' ? 'Government Scheme' : 
                           result.type === 'document' ? 'Document Guide' : 'Help Topic'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Tips */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Search Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Search Suggestions:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• Use specific keywords like "farmer", "student", "healthcare"</li>
                <li>• Search by scheme names like "PM-KISAN" or "Ayushman Bharat"</li>
                <li>• Try benefit amounts like "₹6000" or "health insurance"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Filter Options:</h4>
              <ul className="space-y-1 text-blue-700">
                <li>• Filter by category to find relevant schemes</li>
                <li>• Use eligibility filter to see only applicable schemes</li>
                <li>• Sort results by relevance or alphabetically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 