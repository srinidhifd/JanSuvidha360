import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Documents', path: '/documents' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">
                    {item.name === 'Dashboard' && '📊'}
                    {item.name === 'Schemes' && '📋'}
                    {item.name === 'Documents' && '📄'}
                  </span>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Verified Citizen</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                  {user?.name?.charAt(0)}
                </div>
              </div>
              
              <button
                onClick={logout}
                className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-2">
                      {item.name === 'Dashboard' && '📊'}
                      {item.name === 'Schemes' && '📋'}
                      {item.name === 'Documents' && '📄'}
                    </span>
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile user info */}
                <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4">
                  <div className="flex items-center space-x-3">
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
            </div>
          )}
        </div>
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