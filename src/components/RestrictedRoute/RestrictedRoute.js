import { Navigate } from 'react-router-dom';
import { useAuth } from 'redux/auth/useAuth';

export const RestrictedRoute = ({ component, fallbackUrl }) => {
  const { isUserLoggedIn } = useAuth();

  return !isUserLoggedIn ? component : <Navigate to={fallbackUrl} />;
};
