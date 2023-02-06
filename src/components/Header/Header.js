import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from 'redux/auth/auth.thunk';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useAuth } from 'redux/auth/useAuth';

const pages = [{ to: '/contacts', title: 'Contacts' }];

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLoggedIn, user } = useAuth();

  const onLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Contacts Book
          </Typography>

          {isUserLoggedIn && (
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {pages.map(page => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.to}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
          )}

          {isUserLoggedIn ? (
            <Box
              sx={{
                flexGrow: 0,
                pr: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Typography>{`Welcome, ${user.name}`}</Typography>
              <Button color="inherit" variant="outlined" onClick={onLogout}>
                Log out
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, pr: 10 }}>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/singup">
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
