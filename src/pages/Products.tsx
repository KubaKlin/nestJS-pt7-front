import { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';
import { getProducts } from '../api';
import type { Product } from '../types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error loading products';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {error && (
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <List aria-label="products list">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ListItem key={product.id || index} divider>
                <ListItemText
                  primary={`${product.name} — $${product.price.toFixed(2)}`}
                  secondary={product.isInStock ? 'In stock' : 'Out of stock'}
                />
              </ListItem>
            ))
          ) : (
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
