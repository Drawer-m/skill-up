import React, { useState, useEffect, useRef } from 'react'; // Added useEffect, useRef
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
import gsap from 'gsap'; // Import gsap

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  // Refs for animation targets
  const containerRef = useRef(null);
  const paperRef = useRef(null);
  const avatarRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const formElements = formRef.current ? formRef.current.children : [];

    // Initial state (hidden)
    gsap.set(paperRef.current, { autoAlpha: 0, y: 50 });
    gsap.set(avatarRef.current, { autoAlpha: 0, scale: 0.5 });
    gsap.set(titleRef.current, { autoAlpha: 0, y: -20 });
    gsap.set(formElements, { autoAlpha: 0, y: 20 }); // Set initial state for form elements
    gsap.set(buttonRef.current, { autoAlpha: 0, y: 20 });
    gsap.set(linkRef.current, { autoAlpha: 0, y: 20 });

    // Animation sequence
    tl.to(paperRef.current, { duration: 0.8, autoAlpha: 1, y: 0, delay: 0.2 })
      .to(avatarRef.current, { duration: 0.5, autoAlpha: 1, scale: 1 }, "-=0.6")
      .to(titleRef.current, { duration: 0.5, autoAlpha: 1, y: 0 }, "-=0.4")
      // Stagger form fields animation
      .to(formElements, { duration: 0.5, autoAlpha: 1, y: 0, stagger: 0.15 }, "-=0.3")
      .to(buttonRef.current, { duration: 0.5, autoAlpha: 1, y: 0 }, "-=0.3")
      .to(linkRef.current, { duration: 0.5, autoAlpha: 1, y: 0 }, "-=0.4");

    // Cleanup function
    return () => {
      tl.kill(); // Kill the timeline instance on unmount
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleLogin = (event) => {
    event.preventDefault();
    const loggedInUser = login(username, password);

    if (loggedInUser) {
      // Set flag before navigating
      sessionStorage.setItem('justLoggedIn', 'true');

      if (loggedInUser.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <Box ref={containerRef} sx={{ py: 8, display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xs">
        <Paper ref={paperRef} elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', visibility: 'hidden' /* Start hidden */ }}>
          <Avatar ref={avatarRef} sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LoginIcon />
          </Avatar>
          <Typography ref={titleRef} component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box ref={formRef} component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
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
            {/* Wrap Button and Link in separate refs if needed, or target directly */}
            <Button
              ref={buttonRef}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end" ref={linkRef}>
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
