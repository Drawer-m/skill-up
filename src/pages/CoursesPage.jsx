import { useState } from 'react';
import React from 'react';
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
import CodeIcon from '@mui/icons-material/Code';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PianoIcon from '@mui/icons-material/Piano';
import ColorLensIcon from '@mui/icons-material/ColorLens';

// Modified courses data to include icons
const courses = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    teacher: 'Alex Johnson',
    price: 29.99,
    category: 'coding',
    iconType: 'code',
  },
  {
    id: 2,
    title: 'Guitar for Beginners',
    teacher: 'Maria Garcia',
    price: 24.99,
    category: 'music',
    iconType: 'music',
  },
  {
    id: 3,
    title: 'Digital Illustration Techniques',
    teacher: 'Sam Lee',
    price: 19.99,
    category: 'art',
    iconType: 'art',
  },
  {
    id: 4,
    title: 'Mobile App Development',
    teacher: 'Jane Smith',
    price: 34.99,
    category: 'coding',
    iconType: 'mobile',
  },
  {
    id: 5,
    title: 'Modern Dance Fundamentals',
    teacher: 'Michael Brown',
    price: 22.99,
    category: 'dance',
    iconType: 'dance',
  },
  {
    id: 6,
    title: 'Oil Painting Masterclass',
    teacher: 'Emma Wilson',
    price: 29.99,
    category: 'art',
    iconType: 'painting',
  },
  {
    id: 7,
    title: 'Piano for Intermediates',
    teacher: 'David Miller',
    price: 27.99,
    category: 'music',
    iconType: 'piano',
  },
  {
    id: 8,
    title: 'Python Data Science',
    teacher: 'Lisa Chen',
    price: 39.99,
    category: 'coding',
    iconType: 'data',
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'coding', label: 'Coding' },
  { value: 'music', label: 'Music' },
  { value: 'art', label: 'Art' },
  { value: 'dance', label: 'Dance' },
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // Render the correct icon based on the course's iconType
  const renderCourseIcon = (iconType, size = 60) => {
    switch(iconType) {
      case 'code':
        return <CodeIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      case 'music':
        return <MusicNoteIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      case 'art':
        return <BrushIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      case 'dance':
        return <SportsBasketballIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      case 'mobile':
        return <PhoneAndroidIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      case 'painting':
        return <ColorLensIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      case 'piano':
        return <PianoIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      case 'data':
        return <DataObjectIcon sx={{ fontSize: size, color: 'background.paper' }} />;
      default:
        return <CodeIcon sx={{ fontSize: size, color: 'background.paper' }} />;
    }
  };

  // Filter courses based on search term and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ py: 8, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Available Courses
        </Typography>

        {/* Search and Filter */}
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

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <Grid container spacing={4}>
            {filteredCourses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: '0.3s',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3,
                      borderColor: 'primary.light',
                    }
                  }}
                >
                  <Box sx={{ 
                    bgcolor: course.category === 'coding' ? 'primary.dark' : 
                             course.category === 'art' ? 'secondary.dark' : 
                             course.category === 'music' ? 'info.dark' : 'success.dark',
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
                      sx={{
                        bgcolor: 'primary.dark',
                        border: '1px solid',
                        borderColor: 'primary.dark',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          borderColor: 'primary.main',
                        }
                      }}
                    >
                      Enroll Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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
