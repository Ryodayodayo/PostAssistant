import { ReactNode } from 'react';
import { Navigate } from "react-router-dom"
import { auth } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}


const ProtectRoute = ( { children } : ProtectedRouteProps) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

export default ProtectRoute;
