import React, { useState, useEffect, useRef } from 'react'; // Import hooks
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
import gsap from 'gsap'; // Import gsap

const TeacherDashboardPage = () => {
  const { user } = useAuth();
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: '', introVideoUrl: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Refs for animations
  const titleRef = useRef(null);
  const welcomeRef = useRef(null);
  const addCourseRef = useRef(null);
  const myCoursesRef = useRef(null);

  // Animation Effect
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });

    // Initial states
    gsap.set([titleRef.current, welcomeRef.current], { autoAlpha: 0, y: -20 });
    gsap.set(addCourseRef.current, { autoAlpha: 0, x: -40 });
    gsap.set(myCoursesRef.current, { autoAlpha: 0, x: 40 });

    // Animation sequence
    tl.to([titleRef.current, welcomeRef.current], { autoAlpha: 1, y: 0, stagger: 0.2, delay: 0.1 })
      .to(addCourseRef.current, { autoAlpha: 1, x: 0 }, "-=0.4")
      .to(myCoursesRef.current, { autoAlpha: 1, x: 0 }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

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
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: 'calc(100vh - 128px)', overflow: 'hidden' }}> {/* Added overflow hidden */}
      <Container maxWidth="lg">
        <Typography ref={titleRef} variant="h3" component="h1" gutterBottom sx={{ mb: 4, visibility: 'hidden' }}> {/* Add ref & start hidden */}
          Teacher Dashboard
        </Typography>
        <Typography ref={welcomeRef} variant="h6" color="text.secondary" paragraph sx={{ visibility: 'hidden' }}> {/* Add ref & start hidden */}
          Welcome, {user?.username || 'Teacher'}! Manage your courses here.
        </Typography>

        <Grid container spacing={4}>
          {/* Add New Course Form */}
          <Grid item xs={12} md={6} ref={addCourseRef} sx={{ visibility: 'hidden' }}> {/* Add ref & start hidden */}
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
          <Grid item xs={12} md={6} ref={myCoursesRef} sx={{ visibility: 'hidden' }}> {/* Add ref & start hidden */}
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
