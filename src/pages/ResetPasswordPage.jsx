import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const ResetPasswordPage = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <Typography paragraph>
            This page is under construction. Password reset functionality will be available here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;
