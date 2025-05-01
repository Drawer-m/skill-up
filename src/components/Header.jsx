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

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/teacher/dashboard' && location.pathname === '/dashboard');
  };

  // Teacher dashboard path
  const dashboardPath = '/teacher/dashboard';

  // Filter out the Teach link for teachers (they see Dashboard instead)
  const filteredNavItems = navItems.filter(item => {
    return !(user?.role === 'teacher' && item.path === '/teach');
  });

  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
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
            }}
          >
            <ListItemText
              primary={item.name}
              sx={{
                textAlign: 'center',
                color: isActive(item.path) ? 'primary.dark' : 'text.primary',
                fontWeight: isActive(item.path) ? 700 : 400,
              }}
            />
          </ListItem>
        ))}
        {user?.role === 'teacher' && (
          <ListItem 
            button 
            component={RouterLink} 
            to={dashboardPath}
            sx={{
              backgroundColor: isActive(dashboardPath) ? 'rgba(122, 102, 122, 0.15)' : 'transparent',
              borderLeft: isActive(dashboardPath) ? `4px solid ${theme.palette.primary.dark}` : '4px solid transparent',
            }}
          >
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
                      color: 'background.paper',
                      mx: 1,
                      fontWeight: isActive(item.path) ? 700 : 600,
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
                {user?.role === 'teacher' && (
                  <Button
                    component={RouterLink}
                    to={dashboardPath}
                    sx={{ 
                      color: 'background.paper', 
                      mx: 1,
                      fontWeight: isActive(dashboardPath) ? 700 : 600,
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
      <Toolbar /> {/* Empty toolbar to offset the fixed position */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;
