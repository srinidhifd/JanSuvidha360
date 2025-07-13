import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from './ui/Icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Updated navigation items
  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Applications', path: '/applications' },
    { name: 'Documents', path: '/documents' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Search functionality
  const documentRoutes: Record<string, string> = {
    'aadhaar card': '/documents',
    'pan card': '/documents',
    'passport': '/documents',
    'driving license': '/documents',
    'driving licence': '/documents',
    'dl': '/documents',
    'aadhaar': '/documents',
    'pan': '/documents',
    'voter id': '/documents',
    'ration card': '/documents',
    'income certificate': '/documents',
    'caste certificate': '/documents',
    'domicile': '/documents',
    'birth certificate': '/documents',
    'marriage certificate': '/documents',
    'property': '/documents',
    'electricity bill': '/documents',
    'water bill': '/documents',
    'gas connection': '/documents',
    'phone bill': '/documents',
    'gst': '/documents',
    'trade license': '/documents',
    'fssai': '/documents',
    'pollution': '/documents',
    'vehicle': '/documents',
    'insurance': '/documents',
    'lic': '/documents',
  };

  const searchSuggestions = [
    'PM-KISAN scheme',
    'Ayushman Bharat',
    'Scholarship',
    'Housing loan',
    'MUDRA loan',
    'Senior citizen pension',
    'Aadhaar Card',
    'PAN Card',
    'Passport',
    'Driving License',
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const normalized = query.trim().toLowerCase();
      // Check for document keywords
      for (const key in documentRoutes) {
        if (normalized === key || normalized.includes(key)) {
          navigate(documentRoutes[key]);
          setSearchQuery('');
          setShowSearchSuggestions(false);
          return;
        }
      }
      // Default: go to search page
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchQuery('');
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchSuggestions(value.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full">
        <div className="w-full flex items-center h-16 px-4 sm:px-8 lg:px-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center mr-4 sm:mr-10">
            <Link to="/dashboard" className="flex items-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-gray-50">
                <img 
                  src="/jansuvidha360-logo.png" 
                  alt="JanSuvidha360 Logo" 
                  className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110 jansuvidha-logo"
                />
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">JanSuvidha360</h1>
                <p className="text-xs text-gray-500">Government of India Initiative</p>
              </div>
            </Link>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            <Icons.Menu className="w-6 h-6" />
          </button>
          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center space-x-6 mr-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-md text-base font-semibold transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 shadow-sm'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'inherit' }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-full max-w-xl px-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  placeholder="Search schemes, documents..."
                  className="w-full px-5 py-2 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-gray-50"
                  style={{ fontFamily: 'inherit' }}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icons.Search className="w-5 h-5 text-gray-400" />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <Icons.Forward className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              {/* Search Suggestions */}
              {showSearchSuggestions && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {searchSuggestions
                    .filter(suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 4)
                    .map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <Icons.Search className="w-4 h-4 text-gray-400" />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
                  <Link
                    to={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowSearchSuggestions(false)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-200 text-sm text-blue-600 font-medium"
                  >
                    Search for "{searchQuery}"
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* Desktop Right side */}
          <div className="hidden md:flex items-center space-x-4 ml-4">
            <button onClick={() => navigate('/notifications')} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Icons.Bell className="w-6 h-6 text-blue-600" />
            </button>
            <button onClick={() => navigate('/profile')} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Icons.User className="w-7 h-7 text-blue-600" />
            </button>
            <button
              onClick={logout}
              className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              style={{ fontFamily: 'inherit' }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white w-full absolute left-0 top-16 z-50 shadow-lg">
            <div className="flex flex-col space-y-2 px-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ fontFamily: 'inherit' }}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <div className="w-full mt-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    placeholder="Search schemes, documents..."
                    className="w-full px-5 py-2 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-gray-50"
                    style={{ fontFamily: 'inherit' }}
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icons.Search className="w-5 h-5 text-gray-400" />
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => handleSearch(searchQuery)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <Icons.Forward className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
              {/* Mobile user actions */}
              <div className="flex items-center space-x-4 mt-4">
                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/notifications'); }} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Icons.Bell className="w-6 h-6 text-blue-600" />
                </button>
                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Icons.User className="w-7 h-7 text-blue-600" />
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                  className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  style={{ fontFamily: 'inherit' }}
                >
                  Logout
                </button>
              </div>
              {/* Mobile user info */}
              <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Verified Citizen</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Enhanced Professional Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img 
                    src="/jansuvidha360-logo.png" 
                    alt="JanSuvidha360 Logo" 
                    className="w-8 h-8 object-contain jansuvidha-logo"
                  />
                </div>
                <span className="ml-3 text-lg font-bold">JanSuvidha360</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Official digital platform for accessing government schemes and citizen services across India.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <span className="text-sm">📱</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <span className="text-sm">🌐</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/schemes" className="text-gray-400 hover:text-white transition-colors text-sm">Browse Schemes</Link></li>
                <li><Link to="/documents" className="text-gray-400 hover:text-white transition-colors text-sm">Documents</Link></li>
                <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors text-sm">Profile</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Application Status</a></li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Popular Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">🌾 Agriculture</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">🎓 Education</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">🏥 Healthcare</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">🏠 Housing</a></li>
              </ul>
            </div>

            {/* Government Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Government Info</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Digital India</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help & Support</a></li>
              </ul>
            </div>
          </div>
          
          {/* Government Collaboration Bar */}
          <div className="border-t border-gray-700 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
                              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <img src="/jansuvidha360-logo.png" alt="JanSuvidha360 Logo" className="w-4 h-4 object-contain opacity-60 jansuvidha-logo" />
                    <span className="text-sm text-gray-400">Government of India</span>
                  </div>
                                  <div className="flex items-center space-x-2">
                    <img src="/jansuvidha360-logo.png" alt="JanSuvidha360 Logo" className="w-4 h-4 object-contain opacity-60 jansuvidha-logo" />
                    <span className="text-sm text-gray-400">Digital India</span>
                  </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔒</span>
                  <span className="text-sm text-gray-400">Secure Platform</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <span>Helpline: 1800-123-4567</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
              <p>© 2024 Government of India. All rights reserved.</p>
              <p>Developed by Digital India Initiative | Ministry of Electronics & IT</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 