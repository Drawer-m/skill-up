import { useState, useEffect } from 'react'; 
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

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [dataVersion, setDataVersion] = useState(0); 

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

  return (
    <Box sx={{ py: 8, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Available Courses
        </Typography>

        <Box 
          sx={{ 
            mb: 6, 
            p: 3, 
            borderRadius: 2,
            background: 'linear-gradient(to right, rgba(122, 102, 122, 0.15), rgba(156, 131, 153, 0.12))',
            border: '1px solid',
            borderColor: 'primary.dark',
            boxShadow: '0 4px 12px rgba(122, 102, 122, 0.1)'
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
          <Grid container spacing={4}>
            {filteredCourses.map((course) => {
              const enrolled = enrolledIds.includes(course.id);
              const categoryColor = course.category === 'coding' ? 'primary.dark' : 
                                    course.category === 'art' ? 'secondary.dark' : 
                                    course.category === 'music' ? 'info.dark' : 'success.dark';
              
              return (
                <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                  <Card 
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
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3,
                        borderColor: enrolled ? 'success.dark' : 'primary.light',
                      }
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
          <Box sx={{ py: 4, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 3 }}>
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
