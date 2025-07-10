import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  // Profile completion calculation
  const calculateProfileCompletion = () => {
    const fields = [
      user?.name, user?.phoneNumber, user?.dateOfBirth, user?.age, user?.gender,
      user?.state, user?.city, user?.address, user?.occupation, user?.annualIncome,
      user?.aadhaarNumber, user?.panNumber
    ];
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Profile sections for the Profile page
  const profileSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: '👤',
      items: [
        { label: 'Full Name', value: user?.name || 'Not specified', icon: '🏷️', required: true },
        { label: 'Phone Number', value: user?.phoneNumber || 'Not specified', icon: '📱', required: true },
        { label: 'Date of Birth', value: user?.dateOfBirth || 'Not specified', icon: '🎂', required: true },
        { label: 'Age', value: user?.age ? `${user.age} years` : 'Not specified', icon: '📅', required: true },
        { label: 'Gender', value: user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified', icon: '⚧️', required: true },
        { label: 'Verification Status', value: user?.isVerified ? 'Verified' : 'Not verified', icon: '✅', required: false },
      ]
    },
    {
      id: 'location',
      title: 'Location Details',
      icon: '📍',
      items: [
        { label: 'State', value: user?.state || 'Not specified', icon: <img src="/jansuvidha360-logo.png" alt="JanSuvidha360 Logo" className="w-4 h-4 object-contain jansuvidha-logo" />, required: true },
        { label: 'City', value: user?.city || 'Not specified', icon: '🏙️', required: true },
        { label: 'Address', value: user?.address || 'Not specified', icon: '🏠', required: true },
        { label: 'Profile Status', value: user?.profileCompleted ? 'Complete' : 'Incomplete', icon: '📋', required: false },
      ]
    },
    {
      id: 'professional',
      title: 'Professional Information',
      icon: '💼',
      items: [
        { label: 'Occupation', value: user?.occupation ? user.occupation.charAt(0).toUpperCase() + user.occupation.slice(1) : 'Not specified', icon: '👔', required: true },
        { label: 'Annual Income', value: user?.annualIncome ? `₹${user.annualIncome.toLocaleString()}` : 'Not specified', icon: '💰', required: true },
        { label: 'Employment Type', value: user?.occupation === 'salaried' ? 'Salaried Employee' : user?.occupation === 'self-employed' ? 'Self Employed' : user?.occupation === 'business' ? 'Business Owner' : 'Other', icon: '💼', required: false },
      ]
    },
    {
      id: 'documents',
      title: 'Government Documents',
      icon: '📄',
      items: [
        { label: 'Aadhaar Number', value: user?.aadhaarNumber ? `**** **** ${user.aadhaarNumber.slice(-4)}` : 'Not provided', icon: '🆔', required: true },
        { label: 'PAN Number', value: user?.panNumber || 'Not provided', icon: '💳', required: true },
        { label: 'Driving License', value: user?.documents?.drivingLicense?.number ? `**** ${user.documents.drivingLicense.number.slice(-4)}` : 'Not provided', icon: '🚗', required: false },
        { label: 'Passport', value: user?.documents?.passport?.number ? `**** ${user.documents.passport.number.slice(-4)}` : 'Not provided', icon: '🛂', required: false },
      ]
    }
  ];

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'documents', label: 'Documents', icon: '📄' }
  ];

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
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
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="relative">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-lg border-2 border-white border-opacity-30">
                  <span className="text-3xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white text-sm">✓</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{user?.name || 'User'}</h1>
                <p className="text-indigo-100 text-lg mb-2">
                  Government Schemes Portal Member
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">📍</span>
                    <span className="text-indigo-200">{user?.city || 'City'}, {user?.state || 'State'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">🆔</span>
                    <span className="text-indigo-200">ID: {user?.phoneNumber?.slice(-4) || 'XXXX'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-lg border-2 border-white border-opacity-30 mx-auto mb-4">
                <span className={`text-2xl font-bold ${getCompletionColor(profileCompletion)}`}>
                  {profileCompletion}%
                </span>
              </div>
              <div className="text-sm text-indigo-200">Profile Complete</div>
            </div>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:bg-white/90 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Profile Completion</h3>
              <p className="text-gray-600">Complete your profile to get better scheme recommendations</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getCompletionColor(profileCompletion)}`}>
                {profileCompletion}%
              </div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${getCompletionBgColor(profileCompletion)} transition-all duration-500`}
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {profileCompletion < 100 ? 'Fill in missing information to improve your eligibility matching' : 'Your profile is complete! You\'ll get the best scheme recommendations.'}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:bg-white/90 transition-all duration-300">
          <div className="border-b border-gray-200/50">
            <nav className="flex">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'text-blue-600 bg-blue-50/80 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
                  }`}
                >
                  <span className="text-lg mr-2">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {profileSections
                .filter(section => section.id === activeSection)
                .map((section, index) => (
                  <div key={index} className="lg:col-span-2">
                    <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:bg-gray-50/90 transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          <span className="text-2xl mr-3">{section.icon}</span>
                          {section.title}
                        </h3>
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:bg-white transition-all duration-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-lg">{item.icon}</span>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-600">{item.label}</span>
                                    {item.required && (
                                      <span className="text-red-500 text-xs">*</span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-900 font-medium mt-1">
                                    {item.value}
                                  </div>
                                </div>
                              </div>
                              {item.value === 'Not specified' || item.value === 'Not provided' ? (
                                <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded-full">
                                  Missing
                                </span>
                              ) : (
                                <span className="text-green-500 text-xs bg-green-50 px-2 py-1 rounded-full">
                                  ✓ Complete
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:bg-white/90 transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-2xl mr-3">⚡</span>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/schemes" className="group p-6 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 text-left border border-blue-200 hover:border-blue-300 transform hover:scale-105">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">🎯</span>
                <h4 className="font-bold text-blue-900">Check Eligibility</h4>
              </div>
              <p className="text-sm text-blue-700">See which schemes you're eligible for</p>
            </Link>
            
            <Link to="/documents" className="group p-6 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-300 text-left border border-green-200 hover:border-green-300 transform hover:scale-105">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">📄</span>
                <h4 className="font-bold text-green-900">View Documents</h4>
              </div>
              <p className="text-sm text-green-700">Access your government documents</p>
            </Link>
            
            <Link to="/dashboard" className="group p-6 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-300 text-left border border-purple-200 hover:border-purple-300 transform hover:scale-105">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">📊</span>
                <h4 className="font-bold text-purple-900">Dashboard</h4>
              </div>
              <p className="text-sm text-purple-700">View your activity overview</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 