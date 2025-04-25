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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Link,
  Alert, // For messages
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('pupil'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Attempt signup using the context function
    const signupSuccess = signup(username, password, role);

    if (signupSuccess) {
      setSuccess('Sign up successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } else {
      setError('Username already exists or signup failed.'); // Generic error
    }
  };

  return (
    <Box sx={{ py: 8, display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign Up
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
           {success && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {success}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSignUp} sx={{ width: '100%' }}>
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
             <FormControl component="fieldset" sx={{ mt: 2, mb: 1, width: '100%', alignItems: 'center' }}>
              <Typography component="legend" variant="body2" sx={{ mb: 1 }}>Sign up as:</Typography>
              <RadioGroup
                aria-label="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                row
                sx={{ justifyContent: 'center' }}
              >
                <FormControlLabel value="pupil" control={<Radio />} label="Pupil" />
                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.5 }}
              disabled={!!success} // Disable button after success
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpPage;
