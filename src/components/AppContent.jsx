import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import NavBar from './NavBar';
import Products from '../pages/Products';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import CreateProduct from '../pages/CreateProduct';
import PrivateRoute from './PrivateRoute';

const AppContent = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="md">
        <Box mt={4}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
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
