import { useSelector } from 'react-redux';
import {
  selectIsUserLoggedIn,
  selectIsUserRefreshing,
  selectUser,
} from 'redux/selectors';

export const useAuth = () => {
  return {
    user: useSelector(selectUser),
    isUserLoggedIn: useSelector(selectIsUserLoggedIn),
    isUserRefreshing: useSelector(selectIsUserRefreshing),
  };
};
