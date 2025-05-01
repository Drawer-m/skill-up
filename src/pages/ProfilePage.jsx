import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const ProfilePage = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile Page
          </Typography>
          <Typography paragraph>
            This page is under construction. User profile information will be displayed here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
