import { useEffect, useState } from 'react';
import { getProducts } from '../api.js';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
  Box,
} from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || 'Error loading products');
      }
    };
    load();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      <Paper>
        <List aria-label="products list">
          {products.map((product, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${product.name} — $${product.price}`}
                secondary={product.isInStock ? 'In stock' : 'Out of stock'}
              />
            </ListItem>
          ))}
          {products.length === 0 && (
            <ListItem>
              <ListItemText primary="No products found" />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Products;
