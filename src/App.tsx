import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import { useAuthStore } from './store/authStore';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// App pages
import Home from './pages/app/Home';
import Search from './pages/app/Search';
import JobDetails from './pages/app/JobDetails';
import Availability from './pages/app/Availability';
import MyJobs from './pages/app/MyJobs';
import ProviderProfile from './pages/app/ProviderProfile';
import ClientDashboard from './pages/app/ClientDashboard';
import JobPosting from './pages/app/JobPosting';
import StageOffers from './pages/app/StageOffers';
import Favorites from './pages/app/Favorites';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminJobManagement from './pages/admin/JobManagement';
import AdminStats from './pages/admin/Stats';

// 404
import NotFound from './pages/NotFound';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  // Protected Route Component
  const ProtectedRoute: React.FC<{ 
    children: React.ReactNode; 
    allowedRoles?: string[]; 
  }> = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return <Navigate to="/home" replace />;
    }
    
    return <>{children}</>;
  };

  // Public Route Component (redirect if authenticated)
  const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/home" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected Routes with Layout */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/home" replace />} />
            
            {/* App Routes */}
            <Route path="home" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="job-details/:id" element={<JobDetails />} />
            <Route path="availability" element={
              <ProtectedRoute allowedRoles={['prestataire']}>
                <Availability />
              </ProtectedRoute>
            } />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="provider-profile" element={
              <ProtectedRoute allowedRoles={['prestataire']}>
                <ProviderProfile />
              </ProtectedRoute>
            } />
            <Route path="client-dashboard" element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            } />
            <Route path="job-posting" element={
              <ProtectedRoute allowedRoles={['client']}>
                <JobPosting />
              </ProtectedRoute>
            } />
            <Route path="stage-offers" element={<StageOffers />} />
            <Route path="favorites" element={
              <ProtectedRoute allowedRoles={['client']}>
                <Favorites />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="admin/job-management" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminJobManagement />
              </ProtectedRoute>
            } />
            <Route path="admin/stats" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminStats />
              </ProtectedRoute>
            } />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;