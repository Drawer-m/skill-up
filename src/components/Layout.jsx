import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = () => {
  const location = useLocation(); // Keep location if needed elsewhere, otherwise remove

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}> {/* Use a standard Box for the main content */}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
