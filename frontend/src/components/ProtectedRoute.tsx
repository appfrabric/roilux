import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;