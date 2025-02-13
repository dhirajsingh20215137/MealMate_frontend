import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/index';
import { privateRoutes, publicRoutes } from './routes';

const AppRoutes = () => {
  const { user, token } = useAuth();
  const isAuthenticated = user && token;

  return (
    <Routes> 
      {isAuthenticated
        ? privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))
        : publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

      {/* Redirect undefined routes */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/profile" replace />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
