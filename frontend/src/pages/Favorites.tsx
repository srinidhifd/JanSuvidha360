import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { schemesAPI } from '../services/api';
import { Scheme } from '../types';
import Loading from '../components/Loading';

interface FavoriteScheme extends Scheme {
  savedDate: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  tags: string[];
  listId?: string;
}

interface CustomList {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  schemeCount: number;
  isPublic: boolean;
  color: string;
}

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteScheme[]>([]);
  const [customLists, setCustomLists] = useState<CustomList[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'priority' | 'lists' | 'shared'>('all');
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'name' | 'category'>('date');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListData, setNewListData] = useState({
    name: '',
    description: '',
    isPublic: false,
    color: '#3B82F6'
  });

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setFavorites([
        {
          id: 'pm-kisan',
          name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
          description: 'Income support scheme for farmers providing ₹6000 per year in three equal installments',
          department: 'Ministry of Agriculture and Farmers Welfare',
          category: 'agriculture',
          eligibilityCriteria: {
            occupation: ['farmer'],
            maxIncome: 500000,
            customCriteria: ['Must own cultivable land']
          },
          benefits: ['₹6000 per year', 'Direct bank transfer'],
          documentsRequired: ['Aadhaar Card', 'Land ownership documents'],
          applicationProcess: ['Apply online at pmkisan.gov.in'],
          applicationFee: 0,
          processingTime: '30-45 days',
          officialWebsite: 'https://pmkisan.gov.in',
          helplineNumber: '155261',
          status: 'active',
          launchDate: '2019-02-24',
          lastUpdated: '2024-01-15T10:00:00Z',
          tags: ['farmer', 'income-support', 'urgent', 'agriculture', 'farming'],
          savedDate: '2024-01-20T10:30:00Z',
          priority: 'high',
          notes: 'Good for my farming business. Need to apply before March.'
        },
        {
          id: 'nsp-scholarship',
          name: 'National Scholarship Portal - Merit Scholarship',
          description: 'Merit-based scholarship for students pursuing higher education',
          department: 'Ministry of Education',
          category: 'education',
          eligibilityCriteria: {
            minAge: 18,
            maxAge: 30,
            occupation: ['student'],
            maxIncome: 250000
          },
          benefits: ['₹20,000 per year for graduation'],
          documentsRequired: ['Aadhaar Card', 'Income Certificate'],
          applicationProcess: ['Register on scholarships.gov.in'],
          applicationFee: 0,
          processingTime: '60-90 days',
          officialWebsite: 'https://scholarships.gov.in',
          helplineNumber: '0120-6619540',
          status: 'active',
          launchDate: '2015-07-01',
          lastUpdated: '2024-01-16T09:30:00Z',
          tags: ['education', 'scholarship', 'future'],
          savedDate: '2024-01-18T14:20:00Z',
          priority: 'medium',
          notes: 'For my son\'s college education.',
          listId: 'family-schemes'
        },
        {
          id: 'mudra-loan',
          name: 'Pradhan Mantri MUDRA Yojana',
          description: 'Micro-finance scheme for small business entrepreneurs',
          department: 'Ministry of Finance',
          category: 'business',
          eligibilityCriteria: {
            minAge: 18,
            maxAge: 65,
            occupation: ['self-employed', 'unemployed']
          },
          benefits: ['Loan up to ₹10 lakh', 'No collateral required'],
          documentsRequired: ['Aadhaar Card', 'Business plan'],
          applicationProcess: ['Visit nearest participating bank'],
          applicationFee: 0,
          processingTime: '15-30 days',
          officialWebsite: 'https://mudra.org.in',
          helplineNumber: '1800-180-1111',
          status: 'active',
          launchDate: '2015-04-08',
          lastUpdated: '2024-01-18T11:45:00Z',
          tags: ['business', 'micro-finance', 'loan', 'future'],
          savedDate: '2024-01-15T09:15:00Z',
          priority: 'low',
          notes: 'Might be useful for future business expansion.'
        }
      ]);

      setCustomLists([
        {
          id: 'family-schemes',
          name: 'Family Benefits',
          description: 'Schemes beneficial for my family members',
          createdDate: '2024-01-15T10:00:00Z',
          schemeCount: 3,
          isPublic: false,
          color: '#10B981'
        },
        {
          id: 'business-plans',
          name: 'Business Opportunities',
          description: 'Schemes for starting and growing business',
          createdDate: '2024-01-20T14:30:00Z',
          schemeCount: 2,
          isPublic: true,
          color: '#8B5CF6'
        },
        {
          id: 'emergency-funds',
          name: 'Emergency Support',
          description: 'Schemes for financial emergencies',
          createdDate: '2024-01-22T16:45:00Z',
          schemeCount: 1,
          isPublic: false,
          color: '#EF4444'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const sortedAndFilteredFavorites = favorites
    .filter(scheme => {
      if (filterPriority !== 'all' && scheme.priority !== filterPriority) return false;
      if (selectedList && scheme.listId !== selectedList) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'date':
        default:
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
      }
    });

  const removeFavorite = (schemeId: string) => {
    setFavorites(favorites.filter(f => f.id !== schemeId));
  };

  const updatePriority = (schemeId: string, priority: 'low' | 'medium' | 'high') => {
    setFavorites(favorites.map(f => 
      f.id === schemeId ? { ...f, priority } : f
    ));
  };

  const updateNotes = (schemeId: string, notes: string) => {
    setFavorites(favorites.map(f => 
      f.id === schemeId ? { ...f, notes } : f
    ));
  };

  const createCustomList = () => {
    if (newListData.name.trim()) {
      const newList: CustomList = {
        id: Date.now().toString(),
        name: newListData.name,
        description: newListData.description,
        createdDate: new Date().toISOString(),
        schemeCount: 0,
        isPublic: newListData.isPublic,
        color: newListData.color
      };
      
      setCustomLists([...customLists, newList]);
      setNewListData({ name: '', description: '', isPublic: false, color: '#3B82F6' });
      setShowCreateList(false);
    }
  };

  const deleteCustomList = (listId: string) => {
    setCustomLists(customLists.filter(l => l.id !== listId));
    // Remove list assignment from schemes
    setFavorites(favorites.map(f => 
      f.listId === listId ? { ...f, listId: undefined } : f
    ));
    if (selectedList === listId) {
      setSelectedList(null);
    }
  };

  const moveToList = (schemeId: string, listId: string | null) => {
    setFavorites(favorites.map(f => 
      f.id === schemeId ? { ...f, listId: listId || undefined } : f
    ));
  };

  const shareList = (listId: string) => {
    const list = customLists.find(l => l.id === listId);
    if (list) {
      // Mock sharing functionality
      const shareUrl = `${window.location.origin}/shared-list/${listId}`;
      navigator.clipboard.writeText(shareUrl);
      alert(`Share link copied to clipboard!\n${shareUrl}`);
    }
  };

  const exportFavorites = () => {
    const exportData = {
      favorites: sortedAndFilteredFavorites,
      lists: customLists,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-saved-schemes.json';
    a.click();
    URL.revokeObjectURL(url);
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Saved Schemes</h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Manage your bookmarked schemes, create custom lists, and organize your benefits
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{favorites.length}</div>
              <div className="text-blue-100">Saved Schemes</div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Saved</p>
                <p className="text-3xl font-bold text-gray-900">{favorites.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💾</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-3xl font-bold text-red-600">
                  {favorites.filter(f => f.priority === 'high').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔴</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Custom Lists</p>
                <p className="text-3xl font-bold text-purple-600">{customLists.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shared Lists</p>
                <p className="text-3xl font-bold text-green-600">
                  {customLists.filter(l => l.isPublic).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex flex-col space-y-4">
            {/* Tabs */}
            <div className="flex overflow-x-auto">
              {[
                { id: 'all', label: 'All Saved', icon: '📋' },
                { id: 'priority', label: 'By Priority', icon: '⭐' },
                { id: 'lists', label: 'Custom Lists', icon: '📝' },
                { id: 'shared', label: 'Shared', icon: '🔗' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-0 py-3 px-6 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-50/80 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
                  }`}
                >
                  <span className="text-lg mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                {customLists.length > 0 && (
                  <select
                    value={selectedList || ''}
                    onChange={(e) => setSelectedList(e.target.value || null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">All Lists</option>
                    {customLists.map(list => (
                      <option key={list.id} value={list.id}>{list.name}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCreateList(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
                >
                  Create List
                </button>
                <button
                  onClick={exportFavorites}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'lists' ? (
          /* Custom Lists View */
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Custom Lists</h2>
              <button
                onClick={() => setShowCreateList(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                New List
              </button>
            </div>

            {customLists.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No custom lists yet</h3>
                <p className="text-gray-600 mb-4">Create custom lists to organize your saved schemes</p>
                <button
                  onClick={() => setShowCreateList(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Create Your First List
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customLists.map((list) => (
                  <div key={list.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: list.color }}
                      ></div>
                      <div className="flex items-center space-x-2">
                        {list.isPublic && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Public
                          </span>
                        )}
                        <button
                          onClick={() => deleteCustomList(list.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{list.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{list.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {list.schemeCount} schemes
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedList(list.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </button>
                        {list.isPublic && (
                          <button
                            onClick={() => shareList(list.id)}
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            Share
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Saved Schemes View */
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedList ? 
                  `${customLists.find(l => l.id === selectedList)?.name || 'Custom List'}` : 
                  'Your Saved Schemes'
                }
              </h2>

              {sortedAndFilteredFavorites.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💾</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved schemes found</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedList ? 
                      'This list is empty. Add schemes to this list from the schemes page.' :
                      'Save schemes you\'re interested in to access them quickly later.'
                    }
                  </p>
                  <Link
                    to="/schemes"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Browse Schemes
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedAndFilteredFavorites.map((scheme) => (
                    <div key={scheme.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{scheme.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(scheme.priority)}`}>
                              {getPriorityIcon(scheme.priority)} {scheme.priority}
                            </span>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {scheme.category}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{scheme.description}</p>
                          {scheme.notes && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                              <p className="text-sm text-yellow-800">
                                <strong>Notes:</strong> {scheme.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFavorite(scheme.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {scheme.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Link
                            to={`/schemes/${scheme.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Details →
                          </Link>
                          <button className="text-gray-600 hover:text-gray-800 text-sm">
                            Edit Notes
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm">
                            Change Priority
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          Saved on {new Date(scheme.savedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create List Modal */}
        {showCreateList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create Custom List</h2>
                <button
                  onClick={() => setShowCreateList(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">List Name</label>
                  <input
                    type="text"
                    value={newListData.name}
                    onChange={(e) => setNewListData({...newListData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter list name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newListData.description}
                    onChange={(e) => setNewListData({...newListData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter list description"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="color"
                      value={newListData.color}
                      onChange={(e) => setNewListData({...newListData, color: e.target.value})}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newListData.isPublic}
                      onChange={(e) => setNewListData({...newListData, isPublic: e.target.checked})}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                      Make list public
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={() => setShowCreateList(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={createCustomList}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Create List
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 