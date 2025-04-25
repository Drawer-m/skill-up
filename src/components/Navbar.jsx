import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
  Chip,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Teach', path: '/teach' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => {
    // Hide 'Teach' tab if user is a teacher
    if (item.name === 'Teach' && user?.role === 'teacher') {
      return false;
    }
    return true;
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <SchoolIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          SkillUp
        </Typography>
      </Box>
      <List>
        {filteredNavItems.map((item) => (
          <ListItem
            key={item.name}
            component={RouterLink}
            to={item.path}
            sx={{
              backgroundColor: isActive(item.path) ? 'rgba(122, 102, 122, 0.15)' : 'transparent',
              borderLeft: isActive(item.path) ? `4px solid ${theme.palette.primary.dark}` : '4px solid transparent',
              backgroundImage: isActive(item.path) ? 'linear-gradient(to right, #7A667A, #9C8399)' : 'none',
            }}
          >
            <ListItemText
              primary={item.name}
              sx={{
                textAlign: 'center',
                color: isActive(item.path) ? 'background.paper' : 'text.primary',
                fontWeight: isActive(item.path) ? 700 : 400,
              }}
            />
          </ListItem>
        ))}
        {user?.role === 'teacher' && (
          <ListItem button component={RouterLink} to="/teacher/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        )}
        {user ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={`Logout (${user.username})`} />
          </ListItem>
        ) : (
          <ListItem button component={RouterLink} to="/login">
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="fixed" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <SchoolIcon sx={{ mr: 1, color: 'background.paper' }} />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  flexGrow: { xs: 1, md: 0 },
                  color: 'background.paper',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                SkillUp
              </Typography>
            </Box>

            {isMobile ? (
              <>
                {user && (
                  <Chip
                    avatar={<Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}><AccountCircleIcon fontSize="small" /></Avatar>}
                    label={user.username}
                    size="small"
                    sx={{ color: 'background.paper', mr: 1, bgcolor: 'rgba(255,255,255,0.2)' }}
                  />
                )}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {filteredNavItems.map((item) => (
                  <Button
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      position: 'relative',
                      color: 'background.paper',
                      mx: 1,
                      px: 2,
                      py: 0.75,
                      fontWeight: isActive(item.path) ? 700 : 600,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '4px',
                        opacity: isActive(item.path) ? 1 : 0,
                        background: 'linear-gradient(to right, #7A667A, #9C8399)',
                        zIndex: -1,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        '&::before': {
                          opacity: isActive(item.path) ? 1 : 0.7,
                        },
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
                {user?.role === 'teacher' && (
                  <Button
                    component={RouterLink}
                    to="/teacher/dashboard"
                    sx={{ 
                      position: 'relative',
                      color: 'background.paper', 
                      mx: 1,
                      px: 2,
                      py: 0.75,
                      fontWeight: isActive('/teacher/dashboard') ? 700 : 600,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '4px',
                        opacity: isActive('/teacher/dashboard') ? 1 : 0,
                        background: 'linear-gradient(to right, #7A667A, #9C8399)',
                        zIndex: -1,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        '&::before': {
                          opacity: isActive('/teacher/dashboard') ? 1 : 0.7,
                        },
                      },
                    }}
                    startIcon={<DashboardIcon />}
                  >
                    Dashboard
                  </Button>
                )}
                {user ? (
                  <>
                    <Chip
                      avatar={<Avatar sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}><AccountCircleIcon fontSize="small" /></Avatar>}
                      label={user.username}
                      size="small"
                      sx={{ color: 'background.paper', mx: 1, bgcolor: 'rgba(255,255,255,0.2)' }}
                    />
                    <Button
                      color="inherit"
                      onClick={handleLogout}
                      startIcon={<LogoutIcon />}
                      sx={{ ml: 1 }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    startIcon={<LoginIcon />}
                    sx={{ ml: 1 }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
