import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
  FormHelperText,
  Avatar,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmailIcon from '@mui/icons-material/Email';

const skills = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Graphic Design',
  'Digital Marketing',
  'Music Production',
  'Guitar',
  'Piano',
  'Painting',
  'Drawing',
  'Photography',
  'Cooking',
  'Fitness Training',
  'Yoga',
  'Dance',
  'Other',
];

const TeachPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    skill: '',
    experience: '',
    availability: '',
    bio: '',
    sampleUrl: '',
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
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
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.skill) newErrors.skill = 'Skill selection is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience details are required';
    if (!formData.availability.trim()) newErrors.availability = 'Availability information is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    
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
        fullName: '',
        email: '',
        skill: '',
        experience: '',
        availability: '',
        bio: '',
        sampleUrl: '',
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
              <Typography variant="h3" component="h1" gutterBottom>
                Become a Teacher
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary" paragraph>
              Share your skills with our community and earn while making a difference.
            </Typography>
            
            <Paper sx={{ p: 4, mt: 4 }} elevation={2}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <PersonIcon color="primary" sx={{ mr: 1, mt: 1 }} />
                      <TextField
                        required
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <EmailIcon color="primary" sx={{ mr: 1, mt: 1 }} />
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
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <StarIcon color="primary" sx={{ mr: 1, mt: 1 }} />
                      <FormControl fullWidth required error={!!errors.skill}>
                        <InputLabel>Skill to Teach</InputLabel>
                        <Select
                          name="skill"
                          value={formData.skill}
                          onChange={handleChange}
                          label="Skill to Teach"
                        >
                          {skills.map((skill) => (
                            <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                          ))}
                        </Select>
                        {errors.skill && <FormHelperText>{errors.skill}</FormHelperText>}
                      </FormControl>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <StarIcon color="primary" sx={{ mr: 1, mt: 1 }} />
                      <TextField
                        required
                        fullWidth
                        label="Experience Level"
                        name="experience"
                        placeholder="How many years of experience do you have in this skill?"
                        value={formData.experience}
                        onChange={handleChange}
                        error={!!errors.experience}
                        helperText={errors.experience}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <AccessTimeIcon color="primary" sx={{ mr: 1, mt: 1 }} />
                      <TextField
                        required
                        fullWidth
                        label="Availability"
                        name="availability"
                        placeholder="When are you available to teach? (days, hours)"
                        value={formData.availability}
                        onChange={handleChange}
                        error={!!errors.availability}
                        helperText={errors.availability}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <PersonIcon color="primary" sx={{ mr: 1, mt: 1 }} />
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Short Bio"
                        name="bio"
                        placeholder="Tell us about yourself and your teaching approach"
                        value={formData.bio}
                        onChange={handleChange}
                        error={!!errors.bio}
                        helperText={errors.bio}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <LinkIcon color="primary" sx={{ mr: 1, mt: 1 }} />
                      <TextField
                        fullWidth
                        label="Sample Work URL (optional)"
                        name="sampleUrl"
                        placeholder="Link to your portfolio, YouTube videos, etc."
                        value={formData.sampleUrl}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{ mt: 2 }}
                        startIcon={<CloudUploadIcon />}
                      >
                        Submit Application
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, height: '100%', bgcolor: 'background.default' }} elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MonetizationOnIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Why Teach on SkillUp?
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Flexible Schedule" 
                    secondary="Teach when it works for you - set your own hours and availability"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Earn Extra Income" 
                    secondary="Get paid for sharing your knowledge and skills with others"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Build Your Profile" 
                    secondary="Enhance your resume and gain teaching experience"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Join a Community" 
                    secondary="Connect with passionate learners and other skilled teachers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Simple Process" 
                    secondary="We handle the payments, scheduling and marketing for you"
                  />
                </ListItem>
              </List>
            </Paper>
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
          Your application has been submitted successfully! We'll be in touch soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeachPage;
