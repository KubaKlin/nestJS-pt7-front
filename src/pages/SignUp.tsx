import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { signup } from '../api';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await signup({ name, email, password });
      navigate('/login');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Sign-up failed';
      setError(errorMessage);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} aria-label="sign up form">
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
            label="Email"
            type="email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            required
          />
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default SignUp;
