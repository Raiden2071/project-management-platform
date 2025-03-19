import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Divider,
  Grid,
  Alert,
  Tabs,
  Tab,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Avatar,
  Snackbar,
} from '@mui/material';
import { Save as SaveIcon, Upload as UploadIcon } from '@mui/icons-material';
import { RootState } from '../../store/store';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Settings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  
  const [tabValue, setTabValue] = useState(0);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [language, setLanguage] = useState('en');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would call an API to update the user profile
    // For now, we'll just show a success message
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
            <Tab label="Profile" id="settings-tab-0" />
            <Tab label="Preferences" id="settings-tab-1" />
            <Tab label="Security" id="settings-tab-2" />
          </Tabs>
        </Box>
        
        {/* Profile Settings */}
        <TabPanel value={tabValue} index={0}>
          <Box component="form" onSubmit={handleProfileSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="flex-start">
                <Box textAlign="center">
                  <Avatar
                    sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
                    alt={name}
                    src="/placeholder-avatar.jpg"
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                    size="small"
                  >
                    Upload Photo
                    <input type="file" hidden />
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={8}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <TextField
                  margin="normal"
                  fullWidth
                  id="position"
                  label="Position"
                  name="position"
                  placeholder="e.g. Project Manager"
                />
                
                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        
        {/* Preferences */}
        <TabPanel value={tabValue} index={1}>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Language</FormLabel>
            <RadioGroup
              aria-label="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <FormControlLabel value="en" control={<Radio />} label="English" />
              <FormControlLabel value="ru" control={<Radio />} label="Russian" />
              <FormControlLabel value="fr" control={<Radio />} label="French" />
            </RadioGroup>
          </FormControl>
          
          <Divider sx={{ my: 3 }} />
          
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => setSnackbarOpen(true)}
            >
              Save Preferences
            </Button>
          </Box>
        </TabPanel>
        
        {/* Security */}
        <TabPanel value={tabValue} index={2}>
          <Alert severity="info" sx={{ mb: 3 }}>
            This is a placeholder. In a complete implementation, this tab would allow changing passwords and security settings.
          </Alert>
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Current Password"
            type="password"
            id="currentPassword"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
          />
          
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => setSnackbarOpen(true)}
            >
              Update Password
            </Button>
          </Box>
        </TabPanel>
      </Paper>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Settings saved successfully"
      />
    </Container>
  );
};

export default Settings; 