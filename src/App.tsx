import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthProvider';
import { LanguageProvider } from './contexts/LanguageProvider';
import { useAuth } from './hooks/useAuth';

import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { GuestPracticeSelectionPage } from './pages/GuestPracticeSelectionPage';
import { GuestPracticeTestPage } from './pages/GuestPracticeTestPage';
import { GuestMockTestPage } from './pages/GuestMockTestPage';
import { GuestStudyGuidePage } from './pages/GuestStudyGuidePage';
import { TipsPage } from './pages/TipsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { AboutPage } from './pages/AboutPage';

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400"></div>
  </div>
);

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Public route wrapper (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Guest Routes */}
        <Route path="/guest-practice" element={<GuestPracticeSelectionPage />} />
        <Route path="/guest-practice/:subject" element={<GuestPracticeTestPage />} />
        <Route path="/guest-mock-test" element={<GuestMockTestPage />} />
        <Route path="/guest-study-guide" element={<GuestStudyGuidePage />} />
        <Route path="/tips" element={<TipsPage />} />
        
        {/* Legal and Info Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/guest-practice" replace />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/guest-practice" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
          
          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="bg-gray-800"
          />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;