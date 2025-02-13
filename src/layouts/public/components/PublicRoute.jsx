import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../auth/index';

const PublicRoute = ({ children }) => {
  const { user, token } = useAuth();
  const isAuthenticated = user && token;

  return isAuthenticated ? <Navigate to="/profile" replace /> : children || <Outlet />;
};

export default PublicRoute;
