import React from 'react'; // Import React
import CodeIcon from '@mui/icons-material/Code';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BrushIcon from '@mui/icons-material/Brush';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PianoIcon from '@mui/icons-material/Piano';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SchoolIcon from '@mui/icons-material/School'; // Default icon

// Keep the original export if needed elsewhere, but manage data internally
let courseData = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    teacher: 'Alex Johnson',
    price: 29.99,
    category: 'coding',
    iconType: 'code',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build your first website. Covers responsive design and modern web standards.',
    duration: '6 weeks',
    level: 'Beginner',
    syllabus: [
      'Introduction to Web Technologies',
      'HTML Structure and Semantics',
      'CSS Styling and Layouts (Flexbox, Grid)',
      'JavaScript Basics and DOM Manipulation',
      'Introduction to Responsive Design',
      'Final Project: Build a Personal Portfolio Site'
    ],
    teacherBio: 'Alex Johnson is a senior full-stack developer with over 10 years of experience building scalable web applications for tech startups and large enterprises.',
    introVideoUrl: 'https://www.youtube.com/embed/gQojMIhELvM' // Updated Web Dev Intro
  },
  {
    id: 2,
    title: 'Guitar for Beginners',
    teacher: 'Maria Garcia',
    price: 24.99,
    category: 'music',
    iconType: 'music',
    description: 'Start your musical journey with the guitar. Learn basic chords, strumming patterns, and play your first songs.',
    duration: '8 weeks',
    level: 'Beginner',
    syllabus: [
      'Anatomy of the Guitar & Tuning',
      'Basic Finger Exercises',
      'Learning Open Chords (G, C, D, Em, Am)',
      'Simple Strumming Patterns',
      'Playing Easy Songs',
      'Introduction to Tablature'
    ],
    teacherBio: 'Maria Garcia is a professional musician and experienced guitar teacher who has performed internationally and taught students of all ages for 15 years.',
    introVideoUrl: 'https://www.youtube.com/embed/BBz-Jyr23M4' // Updated Guitar Basics
  },
  {
    id: 3,
    title: 'Digital Illustration Techniques',
    teacher: 'Sam Lee',
    price: 19.99,
    category: 'art',
    iconType: 'art',
    description: 'Explore the world of digital art. Learn essential techniques using popular software like Procreate or Photoshop.',
    duration: '4 weeks',
    level: 'Beginner to Intermediate',
    syllabus: [
      'Introduction to Digital Painting Software',
      'Brushes, Layers, and Masks',
      'Sketching and Line Art Techniques',
      'Color Theory and Application',
      'Shading and Lighting Fundamentals',
      'Creating a Finished Illustration'
    ],
    teacherBio: 'Sam Lee is a freelance digital illustrator whose work has been featured in magazines, book covers, and concept art for games.',
    introVideoUrl: 'https://www.youtube.com/embed/noNbuBqvxQE' // Updated Digital Art Intro
  },
  {
    id: 4,
    title: 'Mobile App Development',
    teacher: 'Jane Smith',
    price: 34.99,
    category: 'coding',
    iconType: 'mobile',
    description: 'Learn to build native mobile apps for iOS and Android using React Native. Covers UI design, state management, and API integration.',
    duration: '10 weeks',
    level: 'Intermediate',
    syllabus: [
      'Introduction to React Native and Expo',
      'Components, Props, and State',
      'Styling and Layouts',
      'Navigation (React Navigation)',
      'Working with APIs',
      'State Management (Context API/Redux)',
      'Building and Deploying Apps'
    ],
    teacherBio: 'Jane Smith is a mobile development lead with 8 years of experience creating successful apps for various platforms.',
    introVideoUrl: 'https://www.youtube.com/embed/K0t-RCSlasE' // Updated Mobile App Intro
  },
  {
    id: 5,
    title: 'Modern Dance Fundamentals',
    teacher: 'Michael Brown',
    price: 22.99,
    category: 'dance',
    iconType: 'dance',
    description: 'Discover the expressive world of modern dance. Focuses on technique, improvisation, and choreography basics.',
    duration: '6 weeks',
    level: 'Beginner',
    syllabus: [
      'Warm-up and Conditioning',
      'Core Modern Dance Techniques (Contraction, Release)',
      'Floor Work and Traveling Steps',
      'Introduction to Improvisation',
      'Basic Choreography Concepts',
      'Learning a Short Routine'
    ],
    teacherBio: 'Michael Brown is a professional dancer and choreographer with a passion for teaching and exploring movement.',
    introVideoUrl: 'https://www.youtube.com/embed/sztTqwuJ61Y' // Updated Modern Dance Intro
  },
  {
    id: 6,
    title: 'Oil Painting Masterclass',
    teacher: 'Emma Wilson',
    price: 29.99,
    category: 'art',
    iconType: 'painting',
    description: 'Master the techniques of oil painting, from color mixing and brushwork to composition and creating realistic textures.',
    duration: '8 weeks',
    level: 'Intermediate to Advanced',
    syllabus: [
      'Materials and Studio Setup',
      'Color Mixing and Palette Management',
      'Brush Techniques and Application',
      'Understanding Light and Shadow',
      'Composition and Design Principles',
      'Painting Different Subjects (Still Life, Landscape)',
      'Varnishing and Finishing'
    ],
    teacherBio: 'Emma Wilson is an award-winning oil painter whose works are displayed in galleries worldwide. She has been teaching painting for over 20 years.',
    introVideoUrl: 'https://www.youtube.com/embed/uyt8KnbqM1o' // Updated Oil Painting Intro
  },
  {
    id: 7,
    title: 'Piano for Intermediates',
    teacher: 'David Miller',
    price: 27.99,
    category: 'music',
    iconType: 'piano',
    description: 'Take your piano skills to the next level. Focuses on scales, arpeggios, sight-reading, and playing more complex pieces.',
    duration: '10 weeks',
    level: 'Intermediate',
    syllabus: [
      'Advanced Scales and Arpeggios',
      'Chord Inversions and Progressions',
      'Improving Sight-Reading Skills',
      'Dynamics and Articulation',
      'Introduction to Music Theory',
      'Learning Intermediate Repertoire (Classical, Pop)',
      'Performance Techniques'
    ],
    teacherBio: 'David Miller is a concert pianist and experienced educator holding a Master\'s degree in Piano Performance.',
    introVideoUrl: 'https://www.youtube.com/embed/312-_CUICv8' // Updated Intermediate Piano
  },
  {
    id: 8,
    title: 'Python Data Science',
    teacher: 'Lisa Chen',
    price: 39.99,
    category: 'coding',
    iconType: 'data',
    description: 'Learn the fundamentals of data science using Python. Covers libraries like NumPy, Pandas, Matplotlib, and basic machine learning concepts.',
    duration: '12 weeks',
    level: 'Intermediate',
    syllabus: [
      'Python Basics for Data Science',
      'NumPy for Numerical Computing',
      'Pandas for Data Manipulation and Analysis',
      'Data Visualization with Matplotlib and Seaborn',
      'Introduction to Scikit-learn',
      'Basic Machine Learning Models (Regression, Classification)',
      'Data Cleaning and Preparation',
      'Case Study Project'
    ],
    teacherBio: 'Lisa Chen is a data scientist with extensive experience in applying machine learning techniques to solve real-world problems in the tech industry.',
    introVideoUrl: 'https://www.youtube.com/embed/LHBE6Q9XlzI' // Updated Python Data Science Intro
  },
];

// Export a copy to prevent direct modification from outside
export const courses = [...courseData];

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'coding', label: 'Coding' },
  { value: 'music', label: 'Music' },
  { value: 'art', label: 'Art' },
  { value: 'dance', label: 'Dance' },
];

// --- Enrollment Management ---

const ENROLLED_COURSES_KEY = 'skillup_enrolled_courses';

// Get enrolled course IDs from localStorage
export const getEnrolledCourses = () => {
  const enrolled = localStorage.getItem(ENROLLED_COURSES_KEY);
  return enrolled ? JSON.parse(enrolled) : [];
};

// Check if a course is enrolled
export const isEnrolled = (courseId) => {
  const enrolledIds = getEnrolledCourses();
  return enrolledIds.includes(courseId);
};

// Enroll in a course
export const enrollCourse = (courseId) => {
  const enrolledIds = getEnrolledCourses();
  if (!enrolledIds.includes(courseId)) {
    const updatedIds = [...enrolledIds, courseId];
    localStorage.setItem(ENROLLED_COURSES_KEY, JSON.stringify(updatedIds));
    // Optionally dispatch a custom event to notify other components if needed
    window.dispatchEvent(new Event('enrollmentChanged'));
  }
};

// Unenroll from a course (optional, not implemented in UI yet)
export const unenrollCourse = (courseId) => {
  const enrolledIds = getEnrolledCourses();
  const updatedIds = enrolledIds.filter(id => id !== courseId);
  localStorage.setItem(ENROLLED_COURSES_KEY, JSON.stringify(updatedIds));
  // Optionally dispatch a custom event
  window.dispatchEvent(new Event('enrollmentChanged'));
};

// --- Course Management (Teacher) ---

// Function to add a new course (simulated)
export const addCourse = (newCourseData) => {
  // Find the highest current ID to generate a new unique ID
  const maxId = courseData.reduce((max, course) => (course.id > max ? course.id : max), 0);
  const newCourse = {
    id: maxId + 1, // Generate a simple unique ID
    // Use the provided introVideoUrl or a default if not provided
    introVideoUrl: newCourseData.introVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Default video
    ...newCourseData // Spread the data passed from the form
  };
  
  // Add to the internal array
  courseData.push(newCourse); 
  
  // Update the exported array (though components using `courses` might need a refresh mechanism)
  courses.length = 0; // Clear the exported array
  courses.push(...courseData); // Repopulate with updated data

  console.log('Course added:', newCourse);
  console.log('Updated courses:', courses);

  // Dispatch an event to notify components (like CoursesPage) that data changed
  window.dispatchEvent(new Event('coursesUpdated')); 
};

// Render the correct icon based on the course's iconType
export const renderCourseIcon = (iconType, size = 60, color = 'background.paper') => {
  const sx = { fontSize: size, color: color };
  switch(iconType) {
    case 'code':
      return <CodeIcon sx={sx} />;
    case 'music':
      return <MusicNoteIcon sx={sx} />;
    case 'art':
      return <BrushIcon sx={sx} />;
    case 'dance':
      return <SportsBasketballIcon sx={sx} />;
    case 'mobile':
      return <PhoneAndroidIcon sx={sx} />;
    case 'painting':
      return <ColorLensIcon sx={sx} />;
    case 'piano':
      return <PianoIcon sx={sx} />;
    case 'data':
      return <DataObjectIcon sx={sx} />;
    default:
      return <SchoolIcon sx={sx} />; // Default icon
  }
};
