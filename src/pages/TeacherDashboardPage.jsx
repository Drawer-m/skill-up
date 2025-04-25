import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  TextField, 
  Snackbar, 
  Alert 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinkIcon from '@mui/icons-material/Link';
import { useAuth } from '../context/AuthContext';
import { addCourse } from '../data/courses'; 

const TeacherDashboardPage = () => {
  const { user } = useAuth();
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', introVideoUrl: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description || !newCourse.price) {
      setSnackbarMessage('Please fill in Title, Description, and Price.');
      setOpenSnackbar(true);
      return;
    }
    addCourse({ 
      ...newCourse, 
      price: parseFloat(newCourse.price) || 0,
      teacher: user?.username || 'Teacher',
      category: 'uncategorized',
      iconType: 'default',
      duration: 'N/A',
      level: 'N/A',
      syllabus: [],
      teacherBio: `Bio for ${user?.username || 'Teacher'} (Update needed)`
    }); 
    setSnackbarMessage(`Course "${newCourse.title}" added successfully!`);
    setOpenSnackbar(true);
    setNewCourse({ title: '', description: '', price: '', introVideoUrl: '' });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: 'calc(100vh - 128px)' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Teacher Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Welcome, {user?.username || 'Teacher'}! Manage your courses here. 
        </Typography>

        <Grid container spacing={4}>
          {/* Add New Course Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Add New Course</Typography>
              <Box component="form" onSubmit={handleAddCourse}>
                <TextField
                  fullWidth
                  label="Course Title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Course Description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={3}
                  required
                />
                <TextField
                  fullWidth
                  label="Price ($)"
                  name="price"
                  type="number"
                  value={newCourse.price}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  InputProps={{ startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography> }}
                />
                <TextField
                  fullWidth
                  label="Introduction Video URL (YouTube Embed)"
                  name="introVideoUrl"
                  value={newCourse.introVideoUrl}
                  onChange={handleInputChange}
                  margin="normal"
                  placeholder="e.g., https://www.youtube.com/embed/your_video_id"
                  InputProps={{ 
                    startAdornment: (
                      <LinkIcon color="action" sx={{ mr: 1 }} />
                    ) 
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ mt: 2 }}
                >
                  Add Course
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Placeholder for Existing Courses List */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, bgcolor: 'primary.light' }}>
              <Typography variant="h5" gutterBottom>My Courses</Typography>
              <Typography color="text.secondary">
                (Course listing feature coming soon...)
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeacherDashboardPage;
