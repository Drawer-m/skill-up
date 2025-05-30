import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import TeachPage from './pages/TeachPage';
import ContactPage from './pages/ContactPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CourseViewPage from './pages/CourseViewPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // Fixed capitalization of 'U' in 'SignUp'
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/courses/:courseId/learn" element={<CourseViewPage />} />
            <Route path="/teach" element={<TeachPage />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
            <Route path="/dashboard" element={<TeacherDashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} /> {/* Also update the component name here */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
