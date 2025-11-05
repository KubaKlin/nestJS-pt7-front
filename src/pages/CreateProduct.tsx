import { useContext, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { createProduct } from '../api';
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
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [isInStock, setIsInStock] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!name || !price) {
      setError('Please provide name and price');
      return;
    }
    const numericPrice = Number(price);

    try {
      await createProduct(
        { name, price: numericPrice, isInStock },
        token || null,
      );
      navigate('/');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Create product failed';
      setError(errorMessage);
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
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
            required
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPrice(event.target.value)
            }
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isInStock}
                onChange={(
                  _event: ChangeEvent<HTMLInputElement>,
                  checked: boolean,
                ) => setIsInStock(checked)}
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
