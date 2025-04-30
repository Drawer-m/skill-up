import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Chip,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { courses, categories, renderCourseIcon, getEnrolledCourses } from '../data/courses.jsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import gsap from 'gsap';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [dataVersion, setDataVersion] = useState(0);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);

  // Refs for animations
  const titleRef = useRef(null);
  const filterBoxRef = useRef(null);
  const courseGridRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleDataChange = () => {
      setDataVersion(prev => prev + 1);
    };
    window.addEventListener('enrollmentChanged', handleDataChange);
    window.addEventListener('coursesUpdated', handleDataChange);

    return () => {
      window.removeEventListener('enrollmentChanged', handleDataChange);
      window.removeEventListener('coursesUpdated', handleDataChange);
    };
  }, []);

  const enrolledIds = getEnrolledCourses();

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || course.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const aEnrolled = enrolledIds.includes(a.id);
      const bEnrolled = enrolledIds.includes(b.id);
      if (aEnrolled && !bEnrolled) return -1;
      if (!aEnrolled && bEnrolled) return 1;
      return a.id - b.id;
    });

  // Ensure cardRefs array is updated when filteredCourses changes
  useEffect(() => {
    // Reset the refs array to match the number of courses
    cardRefs.current = cardRefs.current.slice(0, filteredCourses.length);
    
    // Fill any empty slots with null
    while (cardRefs.current.length < filteredCourses.length) {
      cardRefs.current.push(null);
    }

    // Only animate the cards when filteredCourses changes
    if (initialAnimationDone) {
      animateCards();
    }
  }, [filteredCourses]);

  // Function to animate only the course cards
  const animateCards = () => {
    // Filter out null refs
    const validCardRefs = cardRefs.current.filter(ref => ref !== null);
    
    if (validCardRefs.length > 0) {
      // Set initial state for cards
      gsap.set(validCardRefs, { autoAlpha: 0, y: 50 });
      
      // Animate cards with a stagger
      gsap.to(validCardRefs, { 
        autoAlpha: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.05, 
      });
    }
    
    // Handle no results container
    if (filteredCourses.length === 0 && courseGridRef.current) {
      gsap.set(courseGridRef.current, { autoAlpha: 0 });
      gsap.to(courseGridRef.current, { autoAlpha: 1, duration: 0.5 });
    }
  };

  // Enhanced Animation Effect - Run only once on mount for the layout elements
  useEffect(() => {
    // Only run this once
    if (initialAnimationDone) return;
    
    // Initialize the timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states for layout elements
    gsap.set(titleRef.current, { autoAlpha: 0, y: -30 });
    gsap.set(filterBoxRef.current, { autoAlpha: 0, y: 30 });
    
    // Animate the title and filter box
    tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.1 })
      .to(filterBoxRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.5")
      .call(() => {
        // After initial layout animation is complete, animate the cards
        animateCards();
        // Mark initial animation as done
        setInitialAnimationDone(true);
      });
    
    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Box sx={{ py: 8, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Typography 
          ref={titleRef}
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ mb: 4, visibility: 'hidden' }}
        >
          Available Courses
        </Typography>

        {/* Filter Box */}
        <Box
          ref={filterBoxRef}
          sx={{
            mb: 6,
            p: 3,
            borderRadius: 2,
            background: 'linear-gradient(to right, rgba(122, 102, 122, 0.15), rgba(156, 131, 153, 0.12))',
            border: '1px solid',
            borderColor: 'primary.dark',
            boxShadow: '0 4px 12px rgba(122, 102, 122, 0.1)',
            visibility: 'hidden',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="body1" fontWeight={600} sx={{ mb: 1, color: 'primary.dark' }}>
                Search Courses
              </Typography>
              <TextField
                fullWidth
                placeholder="Search by course title or teacher name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'primary.dark' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1px',
                      borderColor: 'text.primary',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1px',
                      borderColor: 'primary.dark',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1px',
                      borderColor: 'primary.dark',
                      boxShadow: '0 0 0 3px rgba(122, 102, 122, 0.3)',
                    },
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" fontWeight={600} sx={{ mb: 1, color: 'primary.dark' }}>
                Filter by Category
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1px',
                      borderColor: 'text.primary',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1px',
                      borderColor: 'primary.dark',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1px',
                      borderColor: 'primary.dark',
                      boxShadow: '0 0 0 3px rgba(122, 102, 122, 0.3)',
                    },
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {filteredCourses.length > 0 ? (
          <Grid
            ref={courseGridRef}
            container
            spacing={4}
          >
            {filteredCourses.map((course, index) => {
              const enrolled = enrolledIds.includes(course.id);
              const categoryColor = course.category === 'coding' ? 'primary.dark' : 
                                   course.category === 'art' ? 'secondary.dark' : 
                                   course.category === 'music' ? 'info.dark' : 'success.dark';
              
              return (
                <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    ref={el => cardRefs.current[index] = el}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      border: '1px solid',
                      borderColor: enrolled ? 'success.main' : 'divider',
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative',
                      bgcolor: enrolled ? 'success.lightest' : 'background.paper',
                      visibility: 'hidden', // Start hidden for GSAP
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3,
                        borderColor: enrolled ? 'success.dark' : 'primary.light',
                      },
                    }}
                  >
                    {enrolled && (
                      <Chip
                        icon={<CheckCircleIcon fontSize="small" />}
                        label="Enrolled"
                        size="small"
                        color="success"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          zIndex: 1,
                          bgcolor: 'success.main',
                          color: 'white',
                          '.MuiChip-icon': { color: 'white' }
                        }}
                      />
                    )}
                    <Box sx={{
                      bgcolor: categoryColor,
                      p: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}>
                      {renderCourseIcon(course.iconType, 60)}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {course.title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: '0.75rem',
                            bgcolor: 'primary.dark',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          {course.teacher.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" color="text.secondary">
                          {course.teacher}
                        </Typography>
                      </Stack>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                          label={course.category.charAt(0).toUpperCase() + course.category.slice(1)} 
                          size="small" 
                          variant="outlined"
                          sx={{
                            border: '1px solid',
                            borderColor: course.category === 'coding' ? 'primary.dark' : 
                                        course.category === 'art' ? 'secondary.dark' : 
                                        course.category === 'music' ? 'info.dark' :
                                        'success.dark',
                            color: course.category === 'coding' ? 'primary.dark' : 
                                   course.category === 'art' ? 'secondary.dark' : 
                                   course.category === 'music' ? 'info.dark' :
                                   'success.dark',
                          }}
                        />
                        <Typography variant="h6" color="primary.dark">
                          ${course.price}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="medium"
                        component={RouterLink}
                        to={`/courses/${course.id}`}
                        sx={{
                          bgcolor: enrolled ? 'success.dark' : 'primary.dark',
                          border: '1px solid',
                          borderColor: enrolled ? 'success.dark' : 'primary.dark',
                          '&:hover': {
                            bgcolor: enrolled ? 'success.main' : 'primary.main',
                            borderColor: enrolled ? 'success.main' : 'primary.main',
                          }
                        }}
                      >
                        {enrolled ? 'View Course' : 'View Details'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box 
            ref={el => courseGridRef.current = el}
            sx={{ 
              py: 4, 
              textAlign: 'center', 
              border: '1px solid', 
              borderColor: 'divider', 
              borderRadius: 2, 
              p: 3,
              opacity: 0 // Start hidden for GSAP
            }}
          >
            <Typography variant="h6">No courses found matching your criteria</Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                border: '1px solid',
                borderColor: 'primary.dark',
                color: 'primary.dark',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(122, 102, 122, 0.04)'
                }
              }}
              onClick={() => {
                setSearchTerm('');
                setCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CoursesPage;
