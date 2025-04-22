import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
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
        {navItems.map((item) => (
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
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex' }}>
                {navItems.map((item) => (
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
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
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
      <Toolbar /> {/* This creates space below the fixed AppBar */}
    </Box>
  );
};

export default Navbar;
