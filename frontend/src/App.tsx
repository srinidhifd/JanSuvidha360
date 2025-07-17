import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/schemes" element={
                <ProtectedRoute>
                  <Layout>
                    <Schemes />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/schemes/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <SchemeDetails />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/documents" element={
                <ProtectedRoute>
                  <Layout>
                    <Documents />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/document-manager" element={
                <ProtectedRoute>
                  <Layout>
                    <DocumentManager />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/applications" element={
                <ProtectedRoute>
                  <Layout>
                    <ApplicationStatus />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Layout>
                    <Notifications />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/search" element={
                <ProtectedRoute>
                  <Layout>
                    <SearchResults />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/comparison" element={
                <ProtectedRoute>
                  <Layout>
                    <SchemeComparison />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Layout>
                    <Favorites />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/privacy" element={
                <ProtectedRoute>
                  <Layout>
                    <PrivacyPolicy />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/language-settings" element={
                <ProtectedRoute>
                  <Layout>
                    <LanguageSettings />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </AccessibilityProvider>
    </AuthProvider>
  );
};

export default App; 