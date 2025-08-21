import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from './store/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AppsPage from './pages/AppsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MarketingPage from './pages/MarketingPage';
import BusinessPage from './pages/BusinessPage';
import UsersPage from './pages/UsersPage';
import ProfilePage from './pages/ProfilePage';

// Layout
import Layout from './components/Layout/Layout';

// Route guard component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();
  
  if (state.isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const { state } = useAuth();

  if (state.isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        bgcolor="background.default"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          state.isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } 
      />
      
      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/apps/*" element={<AppsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/marketing" element={<MarketingPage />} />
                <Route path="/business" element={<BusinessPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
