import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Schemes from './pages/Schemes';
import Documents from './pages/Documents';
import DocumentManager from './pages/DocumentManager';
import Profile from './pages/Profile';
import ApplicationStatus from './pages/ApplicationStatus';
import Notifications from './pages/Notifications';
import SearchResults from './pages/SearchResults';
import SchemeComparison from './pages/SchemeComparison';
import Favorites from './pages/Favorites';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Analytics from './pages/Analytics';
import LanguageSettings from './pages/LanguageSettings';
import ProtectedRoute from './components/ProtectedRoute';
import SchemeDetails from './pages/SchemeDetails';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/schemes" element={<Schemes />} />
                      <Route path="/schemes/:id" element={<SchemeDetails />} />
                      <Route path="/documents" element={<Documents />} />
                      <Route path="/document-manager" element={<DocumentManager />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/applications" element={<ApplicationStatus />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/comparison" element={<SchemeComparison />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/language-settings" element={<LanguageSettings />} />
                      <Route path="/" element={<Dashboard />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AccessibilityProvider>
    </AuthProvider>
  );
};

export default App; 