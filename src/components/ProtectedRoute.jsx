import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // User doesn't have the required role, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is logged in and has the required role (if specified)
  return children;
};

export default ProtectedRoute;
