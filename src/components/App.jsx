import './App.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { ContactsPage } from './ContactsPage/ContactsPage';
import { Login } from './LoginPage/Login';
import { Singup } from './Singup/Singup';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from 'redux/auth/auth.thunk';
import { useAuth } from 'redux/auth/useAuth';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';

export const App = () => {
  const dispatch = useDispatch();
  const { isUserRefreshing } = useAuth();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isUserRefreshing ? (
    <>User is loading</>
  ) : (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute
                component={<ContactsPage />}
                fallbackUrl="/login"
              />
            }
          />
          <Route
            path="login"
            element={<RestrictedRoute component={<Login />} fallbackUrl="/" />}
          />
          <Route
            path="singup"
            element={<RestrictedRoute component={<Singup />} fallbackUrl="/" />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
