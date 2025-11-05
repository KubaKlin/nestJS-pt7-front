import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
  Box,
} from '@mui/material';

interface Product {
  name: string;
  price: number;
  isInStock: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error loading products';
        setError(errorMessage);
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
