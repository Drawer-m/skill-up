import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import TeachPage from './pages/TeachPage';
import ContactPage from './pages/ContactPage';
import CourseDetailPage from './pages/CourseDetailPage'; // Import the new page
import LoginPage from './pages/LoginPage'; // Import Login Page
import SignUpPage from './pages/SignUpPage'; // Import SignUp Page
import TeacherDashboardPage from './pages/TeacherDashboardPage'; // Import Teacher Dashboard
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider> 
        <BrowserRouter>
          <Routes>
            {/* Routes with Navbar and Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="courses/:courseId" element={<CourseDetailPage />} /> 
              <Route path="teach" element={<TeachPage />} />
              <Route path="contact" element={<ContactPage />} />

              {/* Protected Teacher Route within Layout */}
              <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
                <Route path="teacher/dashboard" element={<TeacherDashboardPage />} />
                {/* Add other teacher-specific routes here */}
              </Route>
            </Route>
            
            {/* Routes without Navbar and Footer */}
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignUpPage />} /> {/* Add signup route */}
            
            {/* Optional: Add a 404 Not Found route */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
