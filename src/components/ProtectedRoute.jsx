import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in, but wrong role, redirect to home (or an unauthorized page)
    // For simplicity, redirecting home. Could redirect back or show an error.
    return <Navigate to="/" replace />; 
  }

  // User is logged in and has the correct role (or no specific role required)
  return <Outlet />; // Render the child route components
};

export default ProtectedRoute;
