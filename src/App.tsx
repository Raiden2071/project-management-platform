import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import routes from './routes/routes';
import { loginSuccess } from './store/slices/authSlice';
import authService from './services/authService';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App = () => {
  const routing = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const result = await authService.getCurrentUser();
        if (result) {
          dispatch(loginSuccess({
            user: result.user,
            token: localStorage.getItem('token') || '',
          }));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Could dispatch a logout action here
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
};

export default App;
