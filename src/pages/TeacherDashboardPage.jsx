import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const TeacherDashboardPage = () => {
  const { user } = useAuth();
  const [newCourse, setNewCourse] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    introVideoUrl: '', 
    category: 'uncategorized',
    duration: '',
    level: 'Beginner',
    syllabus: ['', '', ''] // Initialize with 3 empty syllabus points
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [myCourses, setMyCourses] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  // Refs for animations
  const titleRef = useRef(null);
  const welcomeRef = useRef(null);
  const addCourseRef = useRef(null);
  const myCoursesRef = useRef(null);
  
  // Add category options for the dropdown
  const categories = [
    { value: 'coding', label: 'Coding' },
    { value: 'music', label: 'Music' },
    { value: 'art', label: 'Art' },
    { value: 'dance', label: 'Dance' },
    { value: 'uncategorized', label: 'Uncategorized' },
  ];

  // Add level options
  const levels = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'All Levels', label: 'All Levels' },
  ];

  // Initialize animations but not dummy data
  useEffect(() => {
    // Animation setup (runs only once after initial load)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });
    gsap.set([titleRef.current, welcomeRef.current], { autoAlpha: 0, y: -20 });
    gsap.set(addCourseRef.current, { autoAlpha: 0, x: -40 });
    gsap.set(myCoursesRef.current, { autoAlpha: 0, x: 40 });
    tl.to([titleRef.current, welcomeRef.current], { autoAlpha: 1, y: 0, stagger: 0.2, delay: 0.1 })
      .to(addCourseRef.current, { autoAlpha: 1, x: 0 }, "-=0.4")
      .to(myCoursesRef.current, { autoAlpha: 1, x: 0 }, "-=0.5");
    return () => {
      tl.kill();
    };
  }, [user]); // Depend on user to ensure username is available and re-init if user changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  // Handle syllabus item change
  const handleSyllabusChange = (index, value) => {
    const updatedSyllabus = [...newCourse.syllabus];
    updatedSyllabus[index] = value;
    setNewCourse(prev => ({ ...prev, syllabus: updatedSyllabus }));
  };

  // Add new syllabus point
  const addSyllabusPoint = () => {
    setNewCourse(prev => ({
      ...prev,
      syllabus: [...prev.syllabus, '']
    }));
  };

  // Remove syllabus point
  const removeSyllabusPoint = (index) => {
    const updatedSyllabus = [...newCourse.syllabus];
    updatedSyllabus.splice(index, 1);
    setNewCourse(prev => ({
      ...prev,
      syllabus: updatedSyllabus
    }));
  };

  // Get appropriate icon based on category
  const getCourseIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'coding':
        return <CodeIcon color="primary" fontSize="large" />;
      case 'music':
        return <MusicNoteIcon color="secondary" fontSize="large" />;
      case 'art':
        return <BrushIcon color="error" fontSize="large" />;
      case 'dance':
        return <SportsBasketballIcon color="success" fontSize="large" />;
      default:
        return <SchoolIcon color="primary" fontSize="large" />;
    }
  };

  // Handle adding a new course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description || !newCourse.price || !newCourse.duration) {
      setSnackbarMessage('Please fill in Title, Description, Price, and Duration.');
      setOpenSnackbar(true);
      return;
    }

    const teacherUsername = user?.username;
    if (!teacherUsername) {
        setSnackbarMessage('Error: User not identified. Cannot add course.');
        setOpenSnackbar(true);
        return;
    }

    // Filter out empty syllabus items
    const filteredSyllabus = newCourse.syllabus.filter(item => item.trim() !== '');

    // Create the new course data object
    const newCourseData = {
      ...newCourse,
      id: Date.now(), // Simple unique ID
      price: parseFloat(newCourse.price) || 0,
      teacher: teacherUsername,
      iconType: newCourse.category || 'default',
      syllabus: filteredSyllabus.length > 0 ? filteredSyllabus : ['Course content being developed'],
      teacherBio: `Bio for ${teacherUsername} (Update needed)`
    };

    // Update the local state directly
    const updatedCourses = [...myCourses, newCourseData];
    setMyCourses(updatedCourses);

    // Show success message and reset form
    setSnackbarMessage(`Course "${newCourse.title}" added successfully!`);
    setOpenSnackbar(true);
    resetForm();
  };

  // Handle updating an existing course
  const handleUpdateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.description || !newCourse.price || !newCourse.duration) {
      setSnackbarMessage('Please fill in Title, Description, Price, and Duration.');
      setOpenSnackbar(true);
      return;
    }

    // Filter out empty syllabus items
    const filteredSyllabus = newCourse.syllabus.filter(item => item.trim() !== '');

    // Find the course by ID and update it
    const updatedCourses = myCourses.map(course => {
      if (course.id === editingCourseId) {
        return {
          ...course,
          title: newCourse.title,
          description: newCourse.description,
          price: parseFloat(newCourse.price) || 0,
          introVideoUrl: newCourse.introVideoUrl,
          category: newCourse.category,
          iconType: newCourse.category, // Update icon type based on category
          duration: newCourse.duration,
          level: newCourse.level,
          syllabus: filteredSyllabus.length > 0 ? filteredSyllabus : ['Course content being developed']
        };
      }
      return course;
    });

    setMyCourses(updatedCourses);
    setSnackbarMessage(`Course "${newCourse.title}" updated successfully!`);
    setOpenSnackbar(true);
    resetForm();
  };

  // Switch to edit mode and populate form with course data
  const handleEditCourse = (courseId) => {
    const courseToEdit = myCourses.find(course => course.id === courseId);
    if (courseToEdit) {
      // Ensure syllabus has at least 3 items for the form
      let syllabus = courseToEdit.syllabus || [];
      while (syllabus.length < 3) {
        syllabus.push('');
      }
      
      setNewCourse({
        title: courseToEdit.title,
        description: courseToEdit.description,
        price: courseToEdit.price.toString(),
        introVideoUrl: courseToEdit.introVideoUrl || '',
        category: courseToEdit.category || 'uncategorized',
        duration: courseToEdit.duration || '',
        level: courseToEdit.level || 'Beginner',
        syllabus: syllabus
      });
      setIsEditMode(true);
      setEditingCourseId(courseId);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    resetForm();
  };

  // Reset form and edit state
  const resetForm = () => {
    setNewCourse({ 
      title: '', 
      description: '', 
      price: '', 
      introVideoUrl: '', 
      category: 'uncategorized',
      duration: '',
      level: 'Beginner',
      syllabus: ['', '', '']
    });
    setIsEditMode(false);
    setEditingCourseId(null);
  };

  const handleDeleteCourse = (courseId) => {
    // If we're currently editing this course, cancel the edit
    if (editingCourseId === courseId) {
      resetForm();
    }
    
    // Filter out the course with the given ID
    const updatedCourses = myCourses.filter(course => course.id !== courseId);
    setMyCourses(updatedCourses);
    setSnackbarMessage(`Course deleted successfully!`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: 'calc(100vh - 128px)', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Typography ref={titleRef} variant="h3" component="h1" gutterBottom sx={{ mb: 4, visibility: 'hidden' }}>
          Teacher Dashboard
        </Typography>
        <Typography ref={welcomeRef} variant="h6" color="text.secondary" paragraph sx={{ visibility: 'hidden' }}>
          Welcome, {user?.username || 'Teacher'}! Manage your courses here.
        </Typography>

        <Grid container spacing={4}>
          {/* Add/Edit Course Form */}
          <Grid item xs={12} md={6} ref={addCourseRef} sx={{ visibility: 'hidden' }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                {isEditMode ? <EditIcon sx={{ mr: 1 }} /> : <AddCircleOutlineIcon sx={{ mr: 1 }} />}
                {isEditMode ? 'Edit Course' : 'Add New Course'}
              </Typography>
              <Box component="form" onSubmit={isEditMode ? handleUpdateCourse : handleAddCourse}>
                {/* Basic Information Section */}
                <Typography variant="subtitle1" color="primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
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
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        name="category"
                        value={newCourse.category}
                        onChange={handleInputChange}
                        label="Category"
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                </Grid>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Duration (e.g., '8 weeks')"
                      name="duration"
                      value={newCourse.duration}
                      onChange={handleInputChange}
                      margin="normal"
                      required
                      placeholder="e.g., 6 weeks, 3 months"
                      InputProps={{
                        startAdornment: <AccessTimeFilledIcon color="action" sx={{ mr: 1 }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="level-label">Level</InputLabel>
                      <Select
                        labelId="level-label"
                        name="level"
                        value={newCourse.level}
                        onChange={handleInputChange}
                        label="Level"
                      >
                        {levels.map((level) => (
                          <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Introduction Video URL (YouTube Embed)"
                  name="introVideoUrl"
                  value={newCourse.introVideoUrl}
                  onChange={handleInputChange}
                  margin="normal"
                  placeholder="e.g., https://www.youtube.com/embed/your_video_id"
                  InputProps={{
                    startAdornment: <LinkIcon color="action" sx={{ mr: 1 }} />
                  }}
                />
                
                {/* What You'll Learn Section */}
                <Typography variant="subtitle1" color="primary" sx={{ mt: 3, mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <MenuBookIcon sx={{ mr: 1 }} /> What Students Will Learn
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {newCourse.syllabus.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Learning point ${index + 1}`}
                      value={item}
                      onChange={(e) => handleSyllabusChange(index, e.target.value)}
                      margin="dense"
                      placeholder="e.g., Build responsive websites using HTML, CSS and JavaScript"
                    />
                    {newCourse.syllabus.length > 1 && (
                      <IconButton 
                        color="error" 
                        onClick={() => removeSyllabusPoint(index)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
                
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addSyllabusPoint}
                  sx={{ mt: 1, mb: 2 }}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add Learning Point
                </Button>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  {isEditMode ? (
                    <>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<UpdateIcon />}
                      >
                        Update Course
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      Add Course
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Existing Courses List with improved UI */}
          <Grid item xs={12} md={6} ref={myCoursesRef} sx={{ visibility: 'hidden' }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>My Courses</Typography>
              
              {myCourses.length > 0 ? (
                <Grid container spacing={3}>
                  {myCourses.map((course) => (
                    <Grid item xs={12} key={course.id}>
                      <Card 
                        sx={{ 
                          display: 'flex', 
                          flexDirection: { xs: 'column', sm: 'row' },
                          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                          backgroundColor: editingCourseId === course.id ? 'rgba(156, 131, 153, 0.1)' : 'background.paper',
                          border: editingCourseId === course.id ? '1px solid' : 'none',
                          borderColor: 'primary.main',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 3
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: course.category === 'coding' ? 'primary.light' : 
                                    course.category === 'music' ? 'secondary.light' :
                                    course.category === 'art' ? 'error.light' :
                                    course.category === 'dance' ? 'success.light' : 'primary.light',
                            p: 2,
                            width: { xs: '100%', sm: '100px' },
                            height: { xs: '80px', sm: 'auto' }
                          }}
                        >
                          {getCourseIcon(course.category)}
                        </Box>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                            <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                              {course.title}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              <Chip 
                                label={course.category.charAt(0).toUpperCase() + course.category.slice(1) || 'Uncategorized'} 
                                size="small" 
                                color={course.category === 'coding' ? 'primary' : 
                                        course.category === 'art' ? 'error' : 
                                        course.category === 'music' ? 'secondary' : 
                                        course.category === 'dance' ? 'success' : 'default'} 
                                variant="outlined" 
                                sx={{ mr: 1, mb: 0.5 }}
                              />
                              <Chip 
                                label={`$${course.price}`} 
                                size="small" 
                                color="success" 
                                variant="outlined"
                                sx={{ mb: 0.5 }}
                              />
                              {course.duration && (
                                <Chip 
                                  icon={<AccessTimeFilledIcon fontSize="small" />}
                                  label={course.duration} 
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                  sx={{ mb: 0.5 }}
                                />
                              )}
                            </Stack>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 1
                          }}>
                            {course.description}
                          </Typography>
                          
                          {/* Display first two syllabus points if they exist */}
                          {course.syllabus && course.syllabus.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Students will learn:
                              </Typography>
                              <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 20px' }}>
                                {course.syllabus.slice(0, 2).map((item, index) => (
                                  <li key={index}>
                                    <Typography variant="caption" color="text.secondary">
                                      {item}
                                    </Typography>
                                  </li>
                                ))}
                                {course.syllabus.length > 2 && (
                                  <Typography variant="caption" color="primary">
                                    +{course.syllabus.length - 2} more points
                                  </Typography>
                                )}
                              </ul>
                            </Box>
                          )}
                        </CardContent>
                        <CardActions sx={{ alignSelf: 'center' }}>
                          <Tooltip title="Edit Course">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleEditCourse(course.id)}
                              aria-label="edit course"
                              disabled={isEditMode && editingCourseId !== course.id}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Course">
                            <IconButton 
                              color="error" 
                              onClick={() => handleDeleteCourse(course.id)}
                              aria-label="delete course"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px dashed',
                  borderColor: 'primary.light' 
                }}>
                  <SchoolIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    You haven't added any courses yet.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use the form to add your first course!
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* Snackbar */}
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
