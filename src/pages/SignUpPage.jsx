import React, { useState, useEffect, useRef } from 'react'; // Import hooks
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
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap'; // Import gsap

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('pupil');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Refs for animation targets
  const containerRef = useRef(null);
  const paperRef = useRef(null);
  const avatarRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const linkRef = useRef(null);

  // Animation Effect (Similar to LoginPage)
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const formElements = formRef.current ? formRef.current.children : [];

    // Initial state (hidden)
    gsap.set(paperRef.current, { autoAlpha: 0, y: 50 });
    gsap.set(avatarRef.current, { autoAlpha: 0, scale: 0.5 });
    gsap.set(titleRef.current, { autoAlpha: 0, y: -20 });
    gsap.set(formElements, { autoAlpha: 0, y: 20 });
    gsap.set(buttonRef.current, { autoAlpha: 0, y: 20 });
    gsap.set(linkRef.current, { autoAlpha: 0, y: 20 });

    // Animation sequence
    tl.to(paperRef.current, { duration: 0.8, autoAlpha: 1, y: 0, delay: 0.2 })
      .to(avatarRef.current, { duration: 0.5, autoAlpha: 1, scale: 1 }, "-=0.6")
      .to(titleRef.current, { duration: 0.5, autoAlpha: 1, y: 0 }, "-=0.4")
      .to(formElements, { duration: 0.5, autoAlpha: 1, y: 0, stagger: 0.1 }, "-=0.3") // Stagger form elements
      .to(buttonRef.current, { duration: 0.5, autoAlpha: 1, y: 0 }, "-=0.3")
      .to(linkRef.current, { duration: 0.5, autoAlpha: 1, y: 0 }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, []);

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
    <Box ref={containerRef} sx={{ py: 8, display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)', overflow: 'hidden' }}> {/* Added overflow hidden */}
      <Container maxWidth="xs">
        <Paper ref={paperRef} elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', visibility: 'hidden' }}> {/* Add ref & start hidden */}
          <Avatar ref={avatarRef} sx={{ m: 1, bgcolor: 'secondary.main' }}> {/* Add ref */}
            <LockOutlinedIcon />
          </Avatar>
          <Typography ref={titleRef} component="h1" variant="h5" sx={{ mb: 3 }}> {/* Add ref */}
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
          <Box ref={formRef} component="form" onSubmit={handleSignUp} sx={{ width: '100%' }}> {/* Add ref */}
            {/* Wrap each form element in a div/Box if more precise staggering is needed */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
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
              ref={buttonRef} // Add ref
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.5 }}
              disabled={!!success}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end" ref={linkRef}> {/* Add ref */}
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
