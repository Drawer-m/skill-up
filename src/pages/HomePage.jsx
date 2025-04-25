import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Stack,
  Avatar,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupIcon from '@mui/icons-material/Group';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: <CodeIcon fontSize="large" color="primary" />,
    title: "Learn Coding",
    description: "From web development to machine learning, find the right coding course for you."
  },
  {
    icon: <MusicNoteIcon fontSize="large" color="primary" />,
    title: "Master Music",
    description: "Learn instruments, vocals, or music production from experienced musicians."
  },
  {
    icon: <BrushIcon fontSize="large" color="primary" />,
    title: "Explore Art",
    description: "Discover painting, drawing, digital design and more with talented artists."
  },
  {
    icon: <SportsBasketballIcon fontSize="large" color="primary" />,
    title: "Physical Skills",
    description: "Improve your dance, yoga, sports techniques with certified instructors."
  }
];

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: { xs: 10, md: 16 },
          background: 'linear-gradient(rgba(246, 223, 215, 0.5), rgba(246, 223, 215, 0.8))',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Where Learning Meets Growth
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Join our community of teachers and learners. Learn new skills, share your expertise, 
                and connect with passionate people from around the world.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={RouterLink}
                  to="/courses"
                  startIcon={<MenuBookIcon />}
                >
                  Explore Courses
                </Button>
                {/* Conditionally render the "Become a Teacher" button */}
                {user?.role !== 'teacher' && (
                  <Button 
                    variant="outlined" 
                    size="large" 
                    component={RouterLink}
                    to="/teach"
                    startIcon={<SchoolIcon />}
                  >
                    Become a Teacher
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.light',
                  width: { xs: 200, md: 300 }, 
                  height: { xs: 200, md: 300 },
                  boxShadow: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GroupIcon sx={{ fontSize: { xs: 100, md: 150 }, color: 'primary.main' }} />
              </Avatar>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          What You Can Learn
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Discover affordable and flexible skill-sharing opportunities
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  }
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" color="text.primary">
                    {feature.title}
                  </Typography>
                  <Typography textAlign="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Ready to Start Your Learning Journey?
          </Typography>
          <Typography variant="h6" textAlign="center" paragraph sx={{ mb: 4 }}>
            Join thousands of students and teachers in our community and start learning today.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large" 
              component={RouterLink}
              to="/courses"
              sx={{ 
                bgcolor: 'secondary.main',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                }
              }}
            >
              Find Your Perfect Course
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
