import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import NavBar from './NavBar';
import Products from '../pages/Products';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import CreateProduct from '../pages/CreateProduct';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppContent = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="md">
        <Box mt={4}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route
              path="/sign-up"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/create-product"
              element={
                <PrivateRoute>
                  <CreateProduct />
                </PrivateRoute>
              }
            />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
};

export default AppContent;
