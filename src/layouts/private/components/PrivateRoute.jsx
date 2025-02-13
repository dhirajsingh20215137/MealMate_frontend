import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../auth/index';

const PrivateRoute = ({ children }) => {
  const { user, token } = useAuth();
  const isAuthenticated = user && token;

  return isAuthenticated ? children || <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
