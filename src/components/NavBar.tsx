import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Products
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/create-product">
              Create Product
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/sign-up">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
