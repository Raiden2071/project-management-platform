import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Grid,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginStart, loginSuccess, loginFail } from '../../store/slices/authSlice';
import authService from '../../services/authService';
import { RootState } from '../../store/store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the from path or default to dashboard
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email.trim() || !password.trim()) {
      dispatch(loginFail('Please enter both email and password'));
      return;
    }
    
    try {
      dispatch(loginStart());
      
      // Call auth service
      const result = await authService.login({ email, password });
      
      // Update global state
      dispatch(loginSuccess(result));
      
      // Navigate to the protected page or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(loginFail((error as Error).message || 'Login failed'));
    }
  };
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/auth/register" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login; 