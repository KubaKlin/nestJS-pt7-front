import { useContext, useState } from 'react';
import { login } from '../api.js';
import { AuthContext } from '../AuthContext';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { handleLoginSuccess } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const { token } = await login({ email, password });
      handleLoginSuccess(token);
      navigate('/');
    } catch (event) {
      setError(event.message || 'Login failed');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Log In
      </Typography>
      {error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} aria-label="log in form">
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
          >
            Log In
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Login;
