import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  TextField, 
  Avatar,
  Alert,
  Link,
  Grid,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const loggedInUser = login(username, password);
    
    if (loggedInUser) {
      if (loggedInUser.role === 'teacher') {
        navigate('/teacher/dashboard'); 
      } else {
        navigate('/');
      }
    }
  };

  return (
    <Box sx={{ py: 8, display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
