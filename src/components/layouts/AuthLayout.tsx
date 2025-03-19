import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="sm" sx={{ my: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            py: 4, 
            px: { xs: 2, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom sx={{ mb: 3 }}>
            Project Management Platform
          </Typography>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout; 