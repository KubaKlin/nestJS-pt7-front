import { useContext, useState } from 'react';
import { createProduct } from '../api.js';
import { AuthContext } from '../AuthContext';
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
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isInStock, setIsInStock] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (!name || !price) {
      setError('Please provide name and price');
      return;
    }
    const numericPrice = Number(price);

    try {
      await createProduct({ name, price: numericPrice, isInStock }, token);
      navigate('/');
    } catch (event) {
      setError(event.message || 'Create product failed');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create Product
      </Typography>
      {error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} aria-label="create product form">
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isInStock}
                onChange={(event) => setIsInStock(event.target.checked)}
              />
            }
            label="In Stock"
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default CreateProduct;
