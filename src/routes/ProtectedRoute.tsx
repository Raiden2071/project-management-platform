import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // If auth is still loading, we could show a loading spinner
  if (isLoading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    // Redirect to login page but remember where we were trying to go
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute; 