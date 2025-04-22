import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              SkillUp
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Where Learning Meets Growth - Join our community of teachers and learners today!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton aria-label="facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="primary">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="linkedin" color="primary">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" underline="hover" color="text.secondary">Terms</Link>
              <Link href="#" underline="hover" color="text.secondary">Privacy Policy</Link>
              <Link href="#" underline="hover" color="text.secondary">About Us</Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SkillUp. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
