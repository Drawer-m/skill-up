import { useState, useEffect, useRef } from 'react'; // Import hooks
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
  Card,
  CardContent,
  useTheme,
  Avatar,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import gsap from 'gsap'; // Import gsap

const ContactPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Refs for animations
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoCardsRef = useRef([]);

  // Animation Effect
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });
    const formElements = formRef.current ? formRef.current.querySelectorAll('.MuiGrid-item > .MuiTextField-root, .MuiGrid-item > .MuiButton-root') : [];

    // Initial states
    gsap.set(titleRef.current, { autoAlpha: 0, y: -30 });
    gsap.set(formRef.current, { autoAlpha: 0, y: 50 });
    gsap.set(infoCardsRef.current, { autoAlpha: 0, y: 50 });
    gsap.set(formElements, { autoAlpha: 0, y: 20 });

    // Animation sequence
    tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.1 })
      .to(formRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to(formElements, { autoAlpha: 1, y: 0, stagger: 0.1 }, "-=0.6") // Stagger form fields
      .to(infoCardsRef.current, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.6 }, "-=0.5"); // Stagger info cards

    return () => {
      tl.kill();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send the data to a server
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };
  
  const contactInfo = [
    {
      icon: <EmailIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Email Us',
      detail: 'support@skillup.com'
    },
    {
      icon: <LocationOnIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Visit Us',
      detail: '123 Learning Street, Education City, 10001'
    },
    {
      icon: <PhoneIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Call Us',
      detail: '+1 (555) 123-4567'
    }
  ];

  return (
    <Box sx={{ py: 8, overflow: 'hidden' }}> {/* Added overflow hidden */}
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} textAlign="center" ref={titleRef} sx={{ visibility: 'hidden' }}> {/* Add ref & start hidden */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <ContactSupportIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
              <Typography variant="h3" component="h1" gutterBottom>
                Contact Us
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary" paragraph>
              Have questions or suggestions? Get in touch with our team.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper ref={formRef} sx={{ p: 4, visibility: 'hidden' }} elevation={2}> {/* Add ref & start hidden */}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Wrap fields in Grid items for staggering */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={6}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Grid container spacing={3} justifyContent="center">
              {contactInfo.map((info, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    ref={el => infoCardsRef.current[index] = el} // Add ref to array
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3,
                      },
                      visibility: 'hidden', // Start hidden
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        {info.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {info.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {info.detail}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
