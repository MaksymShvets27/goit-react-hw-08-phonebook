import { Navigate } from 'react-router-dom';
import { useAuth } from 'redux/auth/useAuth';

export const ProtectedRoute = ({ component, fallbackUrl = '/login' }) => {
  const { isUserLoggedIn, isUserRefreshing } = useAuth();

  const shouldNavigate = !isUserRefreshing && !isUserLoggedIn;

  return shouldNavigate ? <Navigate to={fallbackUrl} /> : component;
};
