import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { AuthContext } from '../AuthContext';

const NavBar = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          Products
        </Button>
        {isAuthenticated ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/create-product"
            >
              Create Product
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/sign-up"
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
