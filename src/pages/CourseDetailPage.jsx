import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Avatar, 
  Chip, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
// Import enrollment functions
import { courses, renderCourseIcon, isEnrolled, enrollCourse, unenrollCourse, getEnrolledCourses } from '../data/courses.jsx'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For enrolled status
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; // Use video icon again
import { alpha } from '@mui/material/styles';
import gsap from 'gsap'; // Import gsap

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const theme = useTheme();
  const course = courses.find(c => c.id === parseInt(courseId));

  // State for enrollment status and dialogs
  const [enrolled, setEnrolled] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [unenrollDialogOpen, setUnenrollDialogOpen] = useState(false);

  // Refs for animations
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const backButtonRef = useRef(null);

  // Check enrollment status on mount and when localStorage changes
  useEffect(() => {
    setEnrolled(isEnrolled(parseInt(courseId)));

    const handleStorageChange = () => {
      setEnrolled(isEnrolled(parseInt(courseId)));
    };
    window.addEventListener('enrollmentChanged', handleStorageChange);
    return () => {
      window.removeEventListener('enrollmentChanged', handleStorageChange);
    };
  }, [courseId]);

  // Animation Effect
  useEffect(() => {
    if (!course) return; // Don't run animation if course not found

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });

    // Initial states
    gsap.set(backButtonRef.current, { autoAlpha: 0, x: -20 });
    gsap.set(leftColRef.current, { autoAlpha: 0, x: -40 });
    gsap.set(rightColRef.current, { autoAlpha: 0, x: 40 });

    // Animation sequence
    tl.to(backButtonRef.current, { autoAlpha: 1, x: 0, duration: 0.5, delay: 0.1 })
      .to(leftColRef.current, { autoAlpha: 1, x: 0 }, "-=0.3")
      .to(rightColRef.current, { autoAlpha: 1, x: 0 }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, [course]); // Rerun if course changes (though unlikely on this page)


  if (!course) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" align="center">Course not found.</Typography>
        <Box textAlign="center" mt={2}>
          <Button component={RouterLink} to="/courses" variant="outlined" startIcon={<ArrowBackIcon />}>
            Back to Courses
          </Button>
        </Box>
      </Container>
    );
  }

  const handleEnrollClick = () => setEnrollDialogOpen(true);
  const handleEnrollDialogClose = () => setEnrollDialogOpen(false);
  const handleConfirmEnroll = () => { /* ... */ enrollCourse(parseInt(courseId)); setEnrolled(true); setEnrollDialogOpen(false); };
  const handleUnenrollClick = () => setUnenrollDialogOpen(true);
  const handleUnenrollDialogClose = () => setUnenrollDialogOpen(false);
  const handleConfirmUnenroll = () => { /* ... */ unenrollCourse(parseInt(courseId)); setEnrolled(false); setUnenrollDialogOpen(false); };

  // Determine color based on category for consistency
  const categoryColor = course.category === 'coding' ? theme.palette.primary.dark :
                        course.category === 'art' ? theme.palette.secondary.dark :
                        course.category === 'music' ? theme.palette.info.dark : theme.palette.success.dark;

  const categoryLightColor = course.category === 'coding' ? theme.palette.primary.light :
                             course.category === 'art' ? theme.palette.secondary.light :
                             course.category === 'music' ? theme.palette.info.light : theme.palette.success.light;


  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default', overflow: 'hidden' }}> {/* Added overflow hidden */}
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          ref={backButtonRef} // Add ref
          component={RouterLink}
          to="/courses"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, color: 'text.secondary', '&:hover': { bgcolor: alpha(theme.palette.text.secondary, 0.08) }, visibility: 'hidden' }} // Start hidden
        >
          Back to Courses
        </Button>

        <Grid container spacing={4}>
          {/* Left Column: Main Info & Syllabus */}
          <Grid item xs={12} md={8} ref={leftColRef} sx={{ visibility: 'hidden' }}> {/* Add ref & start hidden */}
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
              {/* Header with Icon */}
              <Box sx={{
                p: { xs: 3, md: 4 }, // Responsive padding
                // Apply a subtle gradient
                background: `linear-gradient(135deg, ${categoryColor} 30%, ${alpha(categoryColor, 0.8)} 90%)`,
                color: 'background.paper', // Default text color for this box is already off-white
                display: 'flex',
                alignItems: 'flex-end', // Changed to 'flex-end'
                gap: 16,
              }}>
                {renderCourseIcon(course.iconType, 50)}
                <Box>
                  <Chip
                    label={course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.25)', // Slightly more opaque
                      color: 'white', // Keep chip text white for contrast on chip background
                      mb: 1,
                      fontWeight: 600,
                    }}
                  />
                  {/* Ensure title uses the box's default color (background.paper) */}
                  <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: 'inherit' }}>
                    {course.title}
                  </Typography>
                </Box>
              </Box>

              {/* Course Description */}
              <Box sx={{ p: { xs: 2, md: 3 } }}> {/* Responsive padding */}
                <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>About this course</Typography> {/* Enhanced title */}
                <Typography variant="body1" color="text.secondary" paragraph>
                  {course.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Syllabus */}
                <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>What you'll learn</Typography> {/* Enhanced title */}
                <List dense>
                  {course.syllabus.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}> {/* Increased margin bottom */}
                      <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                        <CheckCircleOutlineIcon fontSize="small" sx={{ color: categoryColor }} />
                      </ListItemIcon>
                      <ListItemText primary={item} primaryTypographyProps={{ color: 'text.secondary' }} /> {/* Subtle text color */}
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* --- CONDITIONAL INTRODUCTION VIDEO SECTION --- */}
              {enrolled && course.introVideoUrl && (
                <Box sx={{ p: { xs: 2, md: 3 }, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: alpha(categoryLightColor, 0.2) }}> {/* Added light background */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PlayCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" gutterBottom component="div" sx={{ color: 'text.primary', fontWeight: 600 }}> {/* Enhanced title */}
                      Course Introduction Video
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary"> {/* Increased margin bottom */}
                    Welcome to the course! Here's an introductory video to get you started:
                  </Typography>
                  <Box
                    component="iframe"
                    width="100%"
                    height="315" // Standard 16:9 aspect ratio height for full width
                    src={course.introVideoUrl}
                    title="Course Introduction Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    sx={{ borderRadius: 1, display: 'block', maxWidth: '560px', mx: 'auto', border: `1px solid ${theme.palette.divider}` }} // Added border
                  />
                </Box>
              )}
              {/* --- END CONDITIONAL INTRODUCTION VIDEO SECTION --- */}
            </Paper>
          </Grid>

          {/* Right Column: Price, Details, Teacher */}
          <Grid item xs={12} md={4} ref={rightColRef} sx={{ visibility: 'hidden' }}> {/* Add ref & start hidden */}
            {/* Enroll Card */}
            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, border: `2px solid ${categoryColor}`, boxShadow: `0 4px 12px ${alpha(categoryColor, 0.2)}` }}> {/* Increased elevation, added shadow */}
              <Typography variant="h4" color={categoryColor} fontWeight="bold" gutterBottom>
                ${course.price}
              </Typography>
              {enrolled ? (
                 <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleUnenrollClick}
                    startIcon={<CheckCircleIcon />}
                    sx={{
                      mb: 2,
                      py: 1.5,
                      bgcolor: 'success.dark',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'success.main',
                      }
                    }}
                  >
                    Enrolled (Click to Unenroll)
                  </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleEnrollClick}
                  sx={{
                    mb: 2,
                    py: 1.5,
                    bgcolor: categoryColor,
                    '&:hover': {
                      // Use alpha for hover brightness adjustment
                      bgcolor: alpha(categoryColor, 0.85),
                    }
                  }}
                >
                  Enroll Now
                </Button>
              )}
              <Typography variant="caption" display="block" textAlign="center" color="text.secondary">
                Full lifetime access
              </Typography>
            </Paper>

            {/* Details Card */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: categoryLightColor, border: `1px dashed ${categoryColor}` }}> {/* Increased elevation */}
              <Typography variant="h6" gutterBottom sx={{ color: categoryColor, fontWeight: 600 }}>Course Details</Typography> {/* Enhanced title */}
              <List dense disablePadding>
                <ListItem disableGutters sx={{ mb: 0.5 }}> {/* Added margin bottom */}
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: categoryColor }}>
                    <ScheduleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }} primary={`Duration: ${course.duration}`} /> {/* Darker text */}
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: categoryColor }}>
                    <BarChartIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }} primary={`Level: ${course.level}`} /> {/* Darker text */}
                </ListItem>
              </List>
            </Paper>

            {/* Teacher Card */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}> {/* Increased elevation */}
              <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>About the Instructor</Typography> {/* Enhanced title */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: categoryColor, mr: 2 }}>
                  {course.teacher.charAt(0)}
                </Avatar>
                <Typography variant="subtitle1" fontWeight="medium" color="text.primary">{course.teacher}</Typography> {/* Darker text */}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {course.teacherBio}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Enrollment Confirmation Dialog */}
      <Dialog
        open={enrollDialogOpen}
        onClose={handleEnrollDialogClose}
        aria-labelledby="enroll-dialog-title"
        aria-describedby="enroll-dialog-description"
      >
        <DialogTitle id="enroll-dialog-title">Confirm Enrollment</DialogTitle>
        <DialogContent>
          <DialogContentText id="enroll-dialog-description">
            Are you sure you want to enroll in "{course.title}" for ${course.price}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEnrollDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEnroll} sx={{ color: categoryColor }} autoFocus>
            Confirm & Enroll
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unenrollment Confirmation Dialog */}
      <Dialog
        open={unenrollDialogOpen}
        onClose={handleUnenrollDialogClose}
        aria-labelledby="unenroll-dialog-title"
        aria-describedby="unenroll-dialog-description"
      >
        <DialogTitle id="unenroll-dialog-title">Confirm Unenrollment</DialogTitle>
        <DialogContent>
          <DialogContentText id="unenroll-dialog-description">
            Are you sure you want to unenroll from "{course.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnenrollDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUnenroll} color="secondary" autoFocus>
            Confirm Unenroll
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseDetailPage;
