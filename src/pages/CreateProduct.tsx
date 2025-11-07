import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { createProduct } from '../api';
import { useAuth } from '../hooks/useAuth';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [isInStock, setIsInStock] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleStockChange = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setIsInStock(checked);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name || !price) {
      setError('Please provide name and price');
      return;
    }

    const numericPrice = Number(price);
    if (numericPrice <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    setIsLoading(true);

    try {
      await createProduct({ name, price: numericPrice, isInStock }, token);
      navigate('/');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Create product failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create Product
      </Typography>

      {error && (
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} aria-label="create product form">
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            required
            fullWidth
            disabled={isLoading}
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
            fullWidth
            disabled={isLoading}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isInStock}
                onChange={handleStockChange}
                disabled={isLoading}
              />
            }
            label="In Stock"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Creating...' : 'Create Product'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default CreateProduct;
