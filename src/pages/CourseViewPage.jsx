import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Tabs,
  Tab,
  Button,
  LinearProgress,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  Link,
  Tooltip,
  CircularProgress,
  Badge,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import QuizIcon from '@mui/icons-material/Quiz';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import LinkIcon from '@mui/icons-material/Link'; // Added missing import
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Added for timer icon
import { alpha } from '@mui/material/styles';

import { courses, renderCourseIcon, isEnrolled } from '../data/courses.jsx';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Generate dummy course modules
const generateModules = (syllabus) => {
  return syllabus.map((item, index) => ({
    id: index + 1,
    title: `Module ${index + 1}: ${item}`,
    description: `Learn all about ${item.toLowerCase()} in this comprehensive module.`,
    duration: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')} hrs`,
    completed: index < 2, // First two modules completed
    lessons: [
      {
        id: `${index + 1}.1`,
        title: `Introduction to ${item}`,
        type: 'video',
        duration: '15:20',
        completed: index < 2
      },
      {
        id: `${index + 1}.2`,
        title: `${item} Fundamentals`,
        type: 'video',
        duration: '22:45',
        completed: index < 2
      },
      {
        id: `${index + 1}.3`,
        title: `${item} Practical Exercise`,
        type: 'assignment',
        duration: '45:00',
        completed: index < 2
      },
      {
        id: `${index + 1}.4`,
        title: `${item} Quiz`,
        type: 'quiz',
        duration: '15:00',
        completed: index < 2
      }
    ]
  }));
};

// Generate dummy resources
const generateResources = (courseTitle, category) => {
  return [
    {
      id: 1,
      title: `${courseTitle} Quick Reference Guide`,
      type: 'pdf',
      size: '2.4 MB',
      icon: <PictureAsPdfIcon color="error" />
    },
    {
      id: 2,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Cheat Sheet`,
      type: 'pdf',
      size: '1.8 MB',
      icon: <PictureAsPdfIcon color="error" />
    },
    {
      id: 3,
      title: 'Practice Files',
      type: 'zip',
      size: '15.7 MB',
      icon: <AttachFileIcon color="primary" />
    },
    {
      id: 4,
      title: 'Supplementary Examples',
      type: 'folder',
      size: '8 files',
      icon: <ArticleIcon color="action" />
    },
    {
      id: 5,
      title: 'Additional Reading Materials',
      type: 'link',
      icon: <LinkIcon color="primary" />
    }
  ];
};

// Generate dummy reviews
const generateReviews = () => {
  const names = ['Sophie Chen', 'James Wilson', 'Olivia Martinez', 'Ethan Kim', 'Zoe Taylor', 'Benjamin Davis'];
  const comments = [
    'This course exceeded my expectations. The instructor explains concepts clearly and the exercises really helped solidify my understanding.',
    'Great content and well-structured curriculum. I especially enjoyed the practical projects that gave me real-world experience.',
    'Excellent course! I went from beginner to confident practitioner in just a few weeks. Highly recommended!',
    'The instructor\'s teaching style made complex topics easy to understand. The bonus resources were also very helpful.',
    'Very comprehensive course with a good balance of theory and practice. The instructor is responsive to questions in the Q&A.',
    'I\'ve taken many courses in this field, but this one stands out for its clarity and depth. Worth every penny!'
  ];
  
  return names.map((name, index) => ({
    id: index + 1,
    name,
    rating: Math.floor(Math.random() * 2) + 4, // Ratings between 4-5
    date: `${Math.floor(Math.random() * 30) + 1} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'][Math.floor(Math.random() * 6)]} 2023`,
    comment: comments[index],
    avatar: name.charAt(0),
    helpful: Math.floor(Math.random() * 50) + 5
  }));
};

// Generate Q&A
const generateQA = () => {
  return [
    {
      id: 1,
      question: 'How do I access the downloadable resources?',
      askedBy: 'Taylor Smith',
      date: '15 May 2023',
      answer: 'You can find all downloadable resources in the Resources tab. Click on the download icon next to each resource to save it to your device.',
      answeredBy: 'Instructor',
      answerDate: '16 May 2023'
    },
    {
      id: 2,
      question: 'Is there a certificate upon completion?',
      askedBy: 'Jordan Lee',
      date: '10 May 2023',
      answer: 'Yes! After completing all modules and the final assessment, you\'ll receive a certificate of completion that you can add to your LinkedIn profile or resume.',
      answeredBy: 'Instructor',
      answerDate: '11 May 2023'
    },
    {
      id: 3,
      question: 'Do you recommend completing the assignments in order?',
      askedBy: 'Alex Johnson',
      date: '5 May 2023',
      answer: 'Yes, the course is structured in a progressive manner. Each module builds on concepts from previous ones, so I recommend following the curriculum in order for the best learning experience.',
      answeredBy: 'Instructor',
      answerDate: '6 May 2023'
    },
    {
      id: 4,
      question: 'How long do I have access to this course?',
      askedBy: 'Morgan Williams',
      date: '28 Apr 2023',
      answer: 'You have lifetime access to this course! Once enrolled, you can access the content anytime, and you\'ll also receive all future updates to the course material.',
      answeredBy: 'Instructor',
      answerDate: '29 Apr 2023'
    }
  ];
};

// Milestones
const generateMilestones = (title) => {
  return [
    {
      id: 1,
      title: 'Course Started',
      completed: true,
      icon: <SchoolIcon />,
      date: '2 weeks ago'
    },
    {
      id: 2,
      title: 'First Module Completed',
      completed: true,
      icon: <CheckCircleIcon />,
      date: '10 days ago'
    },
    {
      id: 3,
      title: '25% Completion',
      completed: true,
      icon: <EmojiEventsIcon />,
      date: '1 week ago'
    },
    {
      id: 4,
      title: '50% Completion',
      completed: false,
      icon: <EmojiEventsIcon />,
      reward: 'Digital Badge'
    },
    {
      id: 5,
      title: 'All Assignments Submitted',
      completed: false,
      icon: <AssignmentIcon />
    },
    {
      id: 6,
      title: `${title} Certification`,
      completed: false,
      icon: <StarIcon />,
      reward: 'Certificate'
    }
  ];
};

const CourseViewPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(25); // Set to 25% progress
  const [expandedModule, setExpandedModule] = useState(0);
  
  // Get course data and check enrollment
  const course = courses.find(c => c.id === parseInt(courseId));
  const enrolled = isEnrolled(parseInt(courseId));
  
  // Generate dummy data
  const modules = course ? generateModules(course.syllabus) : [];
  const resources = course ? generateResources(course.title, course.category) : [];
  const reviews = generateReviews();
  const qa = generateQA();
  const milestones = course ? generateMilestones(course.title) : [];
  
  // Calculate total course length
  const totalModules = modules.length;
  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
  const completedLessons = modules.reduce((total, module) => 
    total + module.lessons.filter(lesson => lesson.completed).length, 0);
  
  // If course not found or not enrolled, redirect to courses page
  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">Course not found.</Typography>
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" component={RouterLink} to="/courses">
            Back to Courses
          </Button>
        </Box>
      </Container>
    );
  }

  if (!enrolled) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">You need to enroll in this course to view its content.</Typography>
        <Box textAlign="center" mt={2}>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to={`/courses/${courseId}`}
            color="primary"
          >
            Go to Course Details
          </Button>
        </Box>
      </Container>
    );
  }

  // Determine colors based on category
  const categoryColor = course.category === 'coding' ? theme.palette.primary.dark :
                        course.category === 'art' ? theme.palette.secondary.dark :
                        course.category === 'music' ? theme.palette.info.dark : 
                        theme.palette.success.dark;

  const categoryLightColor = alpha(categoryColor, 0.1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBack = () => {
    navigate(`/courses/${courseId}`);
  };
  
  const handleModuleChange = (moduleIndex) => {
    setExpandedModule(expandedModule === moduleIndex ? -1 : moduleIndex);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back button and header */}
        <Box sx={{ mb: 4 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBack}
            sx={{ mb: 2 }}
          >
            Back to Course Details
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box 
              sx={{
                bgcolor: categoryColor,
                p: 2,
                borderRadius: 2,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {renderCourseIcon(course.iconType, 40)}
            </Box>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {course.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Instructor: {course.teacher}
                </Typography>
                <Chip 
                  size="small" 
                  label={course.level} 
                  sx={{ ml: 2, bgcolor: categoryLightColor, color: categoryColor }}
                />
                <Tooltip title="Enrolled students">
                  <Chip
                    size="small"
                    icon={<SchoolIcon fontSize="small" />}
                    label={`${Math.floor(Math.random() * 5000) + 1000} students`}
                    sx={{ ml: 1 }}
                    variant="outlined"
                  />
                </Tooltip>
              </Box>
            </Box>
          </Box>
          
          {/* Course Progress Overview */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" fontWeight="medium" color="text.primary">Course Progress</Typography>
                    <Typography variant="body1" fontWeight="bold" color={categoryColor}>{progress}% Complete</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      bgcolor: alpha(categoryColor, 0.1),
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: categoryColor
                      }
                    }} 
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" color={categoryColor}>{completedLessons}</Typography>
                    <Typography variant="body2" color="text.secondary">Lessons completed</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" color={categoryColor}>{totalLessons}</Typography>
                    <Typography variant="body2" color="text.secondary">Total lessons</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" color={categoryColor}>{course.duration}</Typography>
                    <Typography variant="body2" color="text.secondary">Course length</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  {milestones.slice(0, 3).map((milestone) => (
                    <Chip
                      key={milestone.id}
                      icon={milestone.completed ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
                      label={milestone.title}
                      variant={milestone.completed ? "filled" : "outlined"}
                      sx={{ 
                        bgcolor: milestone.completed ? alpha(theme.palette.success.main, 0.1) : 'transparent',
                        borderColor: milestone.completed ? theme.palette.success.main : 'divider',
                        color: milestone.completed ? theme.palette.success.dark : 'text.secondary',
                      }}
                    />
                  ))}
                  <Tooltip title="View all milestones">
                    <Chip
                      label="+ more"
                      variant="outlined"
                      onClick={() => setValue(3)} // Switch to resources tab
                      sx={{ cursor: 'pointer' }}
                    />
                  </Tooltip>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    color="primary"
                    sx={{ 
                      mt: 1, 
                      bgcolor: categoryColor,
                      '&:hover': {
                        bgcolor: alpha(categoryColor, 0.9),
                      }
                    }}
                    startIcon={<PlayCircleOutlineIcon />}
                  >
                    Continue Learning
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        
        {/* Tab navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="course content tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              '& .MuiTab-root': { 
                textTransform: 'none',
                fontSize: '1rem',
                minWidth: 'auto',
                px: 3
              },
              '& .Mui-selected': {
                color: categoryColor,
                fontWeight: 'bold'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: categoryColor
              }
            }}
          >
            <Tab icon={<DescriptionIcon sx={{ mr: 1 }} />} iconPosition="start" label="Overview" />
            <Tab icon={<SchoolIcon sx={{ mr: 1 }} />} iconPosition="start" label="Curriculum" />
            <Tab icon={<ForumIcon sx={{ mr: 1 }} />} iconPosition="start" label="Q&A" />
            <Tab icon={<InfoIcon sx={{ mr: 1 }} />} iconPosition="start" label="Resources" />
          </Tabs>
        </Box>
        
        {/* Tab Content */}
        <TabPanel value={value} index={0}>
          {/* Overview tab */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {/* About course section */}
              <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom fontWeight="medium">
                  About This Course
                </Typography>
                <Typography paragraph>
                  {course.description}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }} fontWeight="medium">
                  What You'll Learn
                </Typography>
                <Grid container spacing={2}>
                  {course.syllabus.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <CheckCircleIcon sx={{ color: categoryColor, mr: 1, mt: 0.5 }} fontSize="small" />
                        <Typography variant="body1">{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
              
              {/* Video section if available */}
              {course.introVideoUrl && (
                <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                  <Typography variant="h5" gutterBottom fontWeight="medium">
                    Introduction Video
                  </Typography>
                  <Typography paragraph color="text.secondary">
                    Watch this introduction video to get started with the course:
                  </Typography>
                  <Box
                    component="iframe"
                    width="100%"
                    height="480"
                    src={course.introVideoUrl}
                    title="Course Introduction Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sx={{ 
                      borderRadius: 1,
                      maxWidth: '800px',
                      mx: 'auto',
                      display: 'block',
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  />
                </Paper>
              )}
              
              {/* Reviews section */}
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" fontWeight="medium">
                    Student Reviews
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={4.7} precision={0.1} readOnly />
                    <Typography variant="body1" sx={{ ml: 1, fontWeight: 'medium' }}>4.7</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>({reviews.length} reviews)</Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {reviews.slice(0, 3).map((review) => (
                  <Box key={review.id} sx={{ mb: 3, pb: 3, borderBottom: review.id < 3 ? `1px solid ${theme.palette.divider}` : 'none' }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Avatar sx={{ bgcolor: categoryColor, mr: 2 }}>{review.avatar}</Avatar>
                      <Box>
                        <Typography variant="subtitle1">{review.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={review.rating} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>{review.date}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {review.comment}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <IconButton size="small">
                        <ThumbUpIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption" color="text.secondary">
                        {review.helpful} found this helpful
                      </Typography>
                    </Box>
                  </Box>
                ))}
                
                {reviews.length > 3 && (
                  <Button 
                    variant="outlined" 
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Show All Reviews
                  </Button>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              {/* Course stats card */}
              <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  Course Details
                </Typography>
                <List dense>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <SchoolIcon fontSize="small" sx={{ color: categoryColor }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`${Math.floor(Math.random() * 5000) + 1000} students enrolled`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <PlayCircleOutlineIcon fontSize="small" sx={{ color: categoryColor }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`${modules.length} modules, ${totalLessons} lessons`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArticleIcon fontSize="small" sx={{ color: categoryColor }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`${resources.length} downloadable resources`}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <AccessTimeIcon fontSize="small" sx={{ color: categoryColor }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={course.duration}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <EmojiEventsIcon fontSize="small" sx={{ color: categoryColor }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Certificate of completion"
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>
              </Paper>
              
              {/* Instructor section */}
              <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom fontWeight="medium">
                  About Your Instructor
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: categoryColor,
                      width: 50,
                      height: 50,
                      mr: 2
                    }}
                  >
                    {course.teacher.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">{course.teacher}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {`${Math.floor(Math.random() * 50) + 10} courses • ${Math.floor(Math.random() * 100000) + 10000} students`}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph>
                  {course.teacherBio || "Information about the instructor will be available soon."}
                </Typography>
              </Paper>
              
              {/* Start next lesson card */}
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2, 
                  bgcolor: categoryLightColor,
                  border: `1px dashed ${categoryColor}`
                }}
              >
                <Typography variant="h6" fontWeight="medium" color={categoryColor} gutterBottom>
                  Continue Learning
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Your next lesson:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Module 3: {modules[2]?.title.split(': ')[1] || 'Next Module'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {modules[2]?.lessons[0]?.title || 'Introduction Lesson'}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{ 
                    bgcolor: categoryColor,
                    '&:hover': {
                      bgcolor: alpha(categoryColor, 0.9),
                    }
                  }}
                >
                  Start Next Lesson
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          {/* Curriculum tab */}
          <Paper elevation={1} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5" gutterBottom fontWeight="medium">
                Course Curriculum
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {totalModules} modules • {totalLessons} lessons • {course.duration} total length
              </Typography>
            </Box>
            
            {/* Module accordions */}
            {modules.map((module, moduleIndex) => (
              <Accordion 
                key={module.id}
                expanded={expandedModule === moduleIndex}
                onChange={() => handleModuleChange(moduleIndex)}
                disableGutters
                elevation={0}
                sx={{ 
                  '&:before': { display: 'none' },
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    px: 3,
                    bgcolor: module.completed ? alpha(theme.palette.success.light, 0.05) : 'background.paper',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.light, 0.05),
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                      {module.completed ? (
                        <CheckCircleIcon color="success" sx={{ mr: 1.5 }} />
                      ) : (
                        <Box 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            borderRadius: '50%', 
                            border: `2px solid ${theme.palette.divider}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                            typography: 'subtitle2',
                            color: 'text.secondary',
                          }}
                        >
                          {module.id}
                        </Box>
                      )}
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {module.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {module.lessons.length} lessons • {module.duration}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      size="small" 
                      label={module.completed ? "Completed" : "In progress"} 
                      color={module.completed ? "success" : "default"}
                      variant={module.completed ? "filled" : "outlined"}
                      sx={{ ml: 2 }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List disablePadding>
                    {module.lessons.map((lesson, lessonIndex) => (
                      <ListItem
                        key={lesson.id}
                        divider={lessonIndex < module.lessons.length - 1}
                        sx={{ 
                          pl: 7,
                          pr: 3,
                          py: 1.5,
                          bgcolor: lesson.completed ? alpha(theme.palette.success.light, 0.05) : 'background.paper',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.light, 0.05),
                          },
                          cursor: 'pointer',
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {lesson.type === 'video' && <PlayCircleOutlineIcon fontSize="small" color={lesson.completed ? "success" : "action"} />}
                          {lesson.type === 'assignment' && <AssignmentIcon fontSize="small" color={lesson.completed ? "success" : "action"} />}
                          {lesson.type === 'quiz' && <QuizIcon fontSize="small" color={lesson.completed ? "success" : "action"} />}
                        </ListItemIcon>
                        <ListItemText
                          primary={lesson.title}
                          secondary={`${lesson.type} • ${lesson.duration}`}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: lesson.completed ? 'text.primary' : 'text.secondary',
                            fontWeight: lesson.completed ? 'medium' : 'regular',
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                          }}
                        />
                        {lesson.completed ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            {lesson.duration}
                          </Typography>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          {/* Q&A tab */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" fontWeight="medium">
                Questions & Answers
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<ChatIcon />}
                color="primary"
              >
                Ask a Question
              </Button>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            {qa.map((item) => (
              <Box key={item.id} sx={{ mb: 4, pb: 4, borderBottom: item.id < qa.length ? `1px solid ${theme.palette.divider}` : 'none' }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Avatar sx={{ bgcolor: alpha(categoryColor, 0.8), mr: 2 }}>{item.askedBy.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">{item.question}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Asked by {item.askedBy} • {item.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {/* Answer */}
                <Box sx={{ display: 'flex', ml: 7, mt: 2 }}>
                  <Avatar sx={{ bgcolor: categoryColor, mr: 2 }}>{item.answeredBy.charAt(0)}</Avatar>
                  <Box sx={{ bgcolor: alpha(categoryColor, 0.05), p: 2, borderRadius: 2, width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {item.answeredBy}
                        {item.answeredBy === 'Instructor' && (
                          <Chip size="small" label="Instructor" color="primary" sx={{ ml: 1, height: 20 }} />
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{item.answerDate}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {item.answer}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            
            <Button 
              variant="outlined" 
              fullWidth
              sx={{ mt: 2 }}
            >
              View All Questions
            </Button>
          </Paper>
        </TabPanel>
        
        <TabPanel value={value} index={3}>
          {/* Resources tab */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {/* Downloadable Resources */}
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h5" fontWeight="medium" gutterBottom>
                  Downloadable Resources
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <List>
                  {resources.map((resource) => (
                    <ListItem
                      key={resource.id}
                      divider={resource.id < resources.length}
                      sx={{ px: 3, py: 2 }}
                    >
                      <ListItemIcon>
                        {resource.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={resource.title}
                        secondary={resource.type === 'link' ? 'External Link' : `${resource.type.toUpperCase()} • ${resource.size}`}
                      />
                      <IconButton color="primary">
                        <DownloadIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
              
              {/* External links */}
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" fontWeight="medium" gutterBottom>
                  Recommended Links
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LinkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Official Documentation"
                      secondary="Access comprehensive reference materials"
                    />
                    <Button variant="outlined" size="small">Visit</Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ArticleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Course Blog"
                      secondary="Latest articles and tutorials"
                    />
                    <Button variant="outlined" size="small">Visit</Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ForumIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Community Forum"
                      secondary="Connect with other students"
                    />
                    <Button variant="outlined" size="small">Visit</Button>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              {/* Course Milestones */}
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Your Course Milestones
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ position: 'relative' }}>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      left: 10, 
                      top: 0, 
                      bottom: 0, 
                      width: 2, 
                      bgcolor: 'divider',
                      zIndex: 0
                    }} 
                  />
                  
                  {milestones.map((milestone, index) => (
                    <Box 
                      key={milestone.id} 
                      sx={{ 
                        display: 'flex', 
                        py: 2,
                        position: 'relative',
                        zIndex: 1
                      }}
                    >
                      <Box sx={{ 
                        mr: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            milestone.completed && (
                              <CheckCircleIcon 
                                color="success" 
                                fontSize="small"
                                sx={{ 
                                  bgcolor: 'background.paper',
                                  borderRadius: '50%'
                                }}
                              />
                            )
                          }
                        >
                          <Avatar 
                            sx={{ 
                              bgcolor: milestone.completed ? categoryColor : alpha(theme.palette.text.disabled, 0.2),
                              color: milestone.completed ? 'white' : theme.palette.text.disabled,
                            }}
                          >
                            {milestone.icon}
                          </Avatar>
                        </Badge>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={milestone.completed ? 'medium' : 'regular'}
                          color={milestone.completed ? 'text.primary' : 'text.secondary'}
                        >
                          {milestone.title}
                        </Typography>
                        {milestone.completed && milestone.date && (
                          <Typography variant="caption" color="text.secondary">
                            Completed {milestone.date}
                          </Typography>
                        )}
                        {!milestone.completed && milestone.reward && (
                          <Chip 
                            label={`Reward: ${milestone.reward}`} 
                            size="small" 
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
              
              {/* Course certificate preview */}
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  bgcolor: alpha(categoryColor, 0.05),
                  border: `1px dashed ${categoryColor}`
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <EmojiEventsIcon sx={{ fontSize: 48, color: categoryColor }} />
                </Box>
                <Typography variant="h6" align="center" fontWeight="medium" gutterBottom>
                  Course Certificate
                </Typography>
                <Typography variant="body2" align="center" paragraph>
                  Complete all course materials to earn your certificate of completion.
                </Typography>
                <Box 
                  sx={{ 
                    border: `1px solid ${theme.palette.divider}`,
                    p: 3,
                    borderRadius: 1,
                    mb: 2,
                    position: 'relative',
                    bgcolor: 'background.paper',
                    backgroundImage: `radial-gradient(${alpha(categoryColor, 0.1)} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="h6" color={categoryColor} fontWeight="bold">
                      CERTIFICATE
                    </Typography>
                    <Typography variant="body2">
                      {course.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {progress}% completed
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" display="block" color="text.secondary" align="center">
                  Current progress: {progress}% - Keep going!
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 5, 
                    mt: 1,
                    borderRadius: 5,
                    bgcolor: alpha(categoryColor, 0.1),
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: categoryColor
                    }
                  }} 
                />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default CourseViewPage;
