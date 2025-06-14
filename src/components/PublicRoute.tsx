import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAuthContext();

  // ローディング中
  if (loading) {
    return <div>Loading...</div>;
  }

  // ログイン済みの場合はHomeへリダイレクト
  if (user) {
    return <Navigate to="/"/>;
  }

  // 未ログインの場合は子コンポーネントを表示
  return <>{children}</>;
};

export default PublicRoute;
