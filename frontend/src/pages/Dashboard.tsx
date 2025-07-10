import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { schemesAPI } from '../services/api';
import { Scheme } from '../types';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch eligibility results first (requires auth)
        try {
          const eligibilityResponse = await schemesAPI.getEligibilityResults();
          if (eligibilityResponse.success) {
            setEligibilityResults(eligibilityResponse.data || []);
          }
        } catch (eligibilityError) {
          console.log('User not authenticated for eligibility, falling back to basic schemes');
          // Fall back to basic schemes view
          const schemesResponse = await schemesAPI.getAllSchemes();
          if (schemesResponse.success) {
            setSchemes(schemesResponse.data || []);
          }
        }
      } catch (err) {
        setError('Network error. Please try again.');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  // Get accurate eligibility data
  const getEligibilityStats = () => {
    if (eligibilityResults.length > 0) {
      const total = eligibilityResults.length;
      const eligible = eligibilityResults.filter(r => r.isEligible).length;
      const ineligible = total - eligible;
      const highMatch = eligibilityResults.filter(r => r.eligibilityScore >= 80).length;
      
      return { total, eligible, ineligible, highMatch };
    } else {
      // Fallback to basic scheme counting
      const total = schemes.length;
      const eligible = schemes.filter(scheme => scheme.status === 'active').length;
      return { total, eligible, ineligible: total - eligible, highMatch: 0 };
    }
  };

  const stats = getEligibilityStats();
  const eligibilityScore = stats.total > 0 
    ? Math.round((stats.eligible / stats.total) * 100)
    : 0;



  // Activity stats for overview
  const activityStats = [
    { label: 'Schemes Applied', value: '12', icon: '📝', color: 'bg-blue-500' },
    { label: 'Approved Schemes', value: '8', icon: '✅', color: 'bg-green-500' },
    { label: 'Pending Applications', value: '3', icon: '⏳', color: 'bg-yellow-500' },
    { label: 'Total Benefits', value: '₹45,000', icon: '💸', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-blue-100/10 to-indigo-100/10"></div>
        </div>
      </div>
      
      <div className="relative z-10 space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="relative">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-lg border-2 border-white border-opacity-30">
                <span className="text-3xl font-bold">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
              <p className="text-indigo-100 text-lg mb-2">
                Government Schemes Portal Member
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm">📍</span>
                  <span className="text-indigo-200">{user?.city}, {user?.state}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm">🆔</span>
                  <span className="text-indigo-200">ID: {user?.phoneNumber?.slice(-4)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="mb-2">
                <img src="/jansuvidha360-logo.png" alt="JanSuvidha360 Logo" className="w-10 h-10 object-contain ml-auto opacity-80 jansuvidha-logo" />
              </div>
              <div className="text-sm text-indigo-200">Government of India</div>
              <div className="text-xs text-indigo-300">Digital India Initiative</div>
            </div>
          </div>
        </div>
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

      {/* Enhanced Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl hover:bg-white transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Schemes</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
              <p className="text-sm text-gray-500 mt-1">Total schemes</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              📋
            </div>
          </div>
          <div className="mt-4">
            <Link to="/schemes" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Browse All →
            </Link>
          </div>
        </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl hover:bg-white transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eligible Schemes</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.eligible}</p>
              <p className="text-sm text-gray-500 mt-1">You can apply</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${eligibilityScore}%` }}
              ></div>
            </div>
          </div>
        </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl hover:bg-white transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profile Status</p>
              <p className={`text-2xl font-bold mt-2 ${user?.profileCompleted ? 'text-green-600' : 'text-orange-600'}`}>
                {user?.profileCompleted ? 'Complete' : 'Incomplete'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {user?.profileCompleted ? 'All information provided' : 'Missing information'}
              </p>
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
              {user?.profileCompleted ? '✅' : '⚠️'}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${user?.profileCompleted ? 'bg-green-500' : 'bg-orange-500'}`}
                style={{ width: user?.profileCompleted ? '100%' : '80%' }}
              ></div>
            </div>
          </div>
        </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl hover:bg-white transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-cyan-600 mt-2">
                {[user?.aadhaarNumber, user?.panNumber].filter(Boolean).length} / 2
              </p>
              <p className="text-sm text-gray-500 mt-1">Documents linked</p>
            </div>
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center text-2xl">
              📄
            </div>
          </div>
          <div className="mt-4">
            <Link to="/documents" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium hover:underline">
              View Documents →
            </Link>
          </div>
        </div>
      </div>

              {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:bg-white/90 transition-all duration-300">
          <div className="border-b border-gray-200/50">
          <nav className="flex">
            {['overview', 'activity', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                      ? 'text-blue-600 bg-blue-50/80 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'activity' && '📈 Activity'}
                {tab === 'settings' && '⚙️ Settings'}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Activity Statistics */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📊</span>
                  Your Activity Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {activityStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3`}>
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Eligibility Chart */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2">🎯</span>
                    Eligibility Distribution
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Eligible</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{stats.eligible}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.total > 0 ? (stats.eligible / stats.total) * 100 : 0}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Not Eligible</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{stats.ineligible}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.total > 0 ? (stats.ineligible / stats.total) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Application Status Chart */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2">📈</span>
                    Application Progress
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Applied</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">12</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" style={{ width: '52%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Approved</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">8</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000" style={{ width: '35%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Pending</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000" style={{ width: '13%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Activity Chart */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">📅</span>
                  Monthly Activity
                </h4>
                <div className="flex items-end space-x-2 h-40">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                    const heights = [60, 80, 45, 90, 75, 95];
                    const values = [3, 4, 2, 5, 4, 6];
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 flex items-end justify-center"
                            style={{ height: `${heights[index]}%` }}
                          >
                            <span className="text-white text-xs font-bold mb-1">{values[index]}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2">{month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">⚡</span>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link to="/schemes" className="group p-6 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 text-left border border-blue-200 hover:border-blue-300 transform hover:scale-105">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">📋</span>
                      <h4 className="font-bold text-blue-900">Browse Schemes</h4>
                    </div>
                    <p className="text-sm text-blue-700">Explore government schemes you're eligible for</p>
                  </Link>
                  
                  <Link to="/documents" className="group p-6 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-300 text-left border border-green-200 hover:border-green-300 transform hover:scale-105">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">📄</span>
                      <h4 className="font-bold text-green-900">My Documents</h4>
                    </div>
                    <p className="text-sm text-green-700">View and manage your government documents</p>
                  </Link>
                  
                  <Link to="/profile" className="group p-6 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-300 text-left border border-purple-200 hover:border-purple-300 transform hover:scale-105">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">👤</span>
                      <h4 className="font-bold text-purple-900">View Profile</h4>
                    </div>
                    <p className="text-sm text-purple-700">Manage your personal information and profile</p>
                  </Link>
                </div>
              </div>

              {/* Recent Schemes */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Recommended For You
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {eligibilityResults.length > 0 ? (
                    eligibilityResults
                      .filter(result => result.isEligible)
                      .slice(0, 4)
                      .map((result, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 hover:from-gray-50/90 hover:to-gray-100/90 transition-all duration-300">
                          <h4 className="font-bold text-gray-900 mb-2">{result.scheme.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{result.scheme.description?.slice(0, 100)}...</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-green-100/80 text-green-800 px-2 py-1 rounded-full">
                                {result.scheme.category}
                              </span>
                              <span className="text-xs bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full">
                                {result.eligibilityScore.toFixed(2)}% match
                              </span>
                            </div>
                            <Link to={`/schemes/${result.scheme.id}`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              Learn More →
                            </Link>
                          </div>
                        </div>
                      ))
                  ) : (
                    schemes.slice(0, 4).map((scheme, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50 hover:from-gray-50/90 hover:to-gray-100/90 transition-all duration-300">
                        <h4 className="font-bold text-gray-900 mb-2">{scheme.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{scheme.description?.slice(0, 100)}...</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-green-100/80 text-green-800 px-2 py-1 rounded-full">
                            {scheme.category}
                          </span>
                          <Link to={`/schemes/${scheme.id}`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Learn More →
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Activity History</h3>
                <p className="text-gray-600 mb-6">Track your scheme applications and document usage</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-blue-50/80 backdrop-blur-sm p-6 rounded-lg hover:bg-blue-50/90 transition-all duration-300">
                    <div className="text-3xl mb-3">📋</div>
                    <h4 className="font-bold text-gray-900 mb-2">Applications</h4>
                    <p className="text-sm text-gray-600">12 schemes applied</p>
                  </div>
                    <div className="bg-green-50/80 backdrop-blur-sm p-6 rounded-lg hover:bg-green-50/90 transition-all duration-300">
                    <div className="text-3xl mb-3">✅</div>
                    <h4 className="font-bold text-gray-900 mb-2">Approved</h4>
                    <p className="text-sm text-gray-600">8 schemes approved</p>
                  </div>
                    <div className="bg-purple-50/80 backdrop-blur-sm p-6 rounded-lg hover:bg-purple-50/90 transition-all duration-300">
                    <div className="text-3xl mb-3">💰</div>
                    <h4 className="font-bold text-gray-900 mb-2">Benefits</h4>
                    <p className="text-sm text-gray-600">₹45,000 received</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-50/90 transition-all duration-300">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🔐</span>
                    Privacy & Security
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Two-Factor Authentication</span>
                      <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">SMS Notifications</span>
                      <div className="w-10 h-6 bg-gray-300 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Email Alerts</span>
                      <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>

                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-50/90 transition-all duration-300">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">📱</span>
                    App Preferences
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Dark Mode</span>
                      <div className="w-10 h-6 bg-gray-300 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Push Notifications</span>
                      <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Auto-Save</span>
                      <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Help Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-xl p-8 border border-indigo-200">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🤝</div>
          <h3 className="text-2xl font-bold text-indigo-900 mb-2">Need Assistance?</h3>
          <p className="text-indigo-700 max-w-2xl mx-auto">
            Our dedicated support team is available 24/7 to help you with schemes, documents, and any questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm hover:bg-white transition-all duration-300">
            <div className="text-3xl mb-3">📞</div>
            <h4 className="font-bold text-gray-900 mb-2">Phone Support</h4>
            <p className="text-sm text-gray-600 mb-3">Call us anytime</p>
            <p className="text-lg font-bold text-blue-600">1800-XXX-XXXX</p>
          </div>
          
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm hover:bg-white transition-all duration-300">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="font-bold text-gray-900 mb-2">Live Chat</h4>
            <p className="text-sm text-gray-600 mb-3">Instant assistance</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Start Chat
            </button>
          </div>
          
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm hover:bg-white transition-all duration-300">
            <div className="text-3xl mb-3">📚</div>
            <h4 className="font-bold text-gray-900 mb-2">Help Center</h4>
            <p className="text-sm text-gray-600 mb-3">Self-help resources</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Browse FAQs
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 