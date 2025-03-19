import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { RootState } from '../../store/store';
import { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFail } from '../../store/slices/projectsSlice';
import projectService from '../../services/projectService';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projects, isLoading, error } = useSelector((state: RootState) => state.projects);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        dispatch(fetchProjectsStart());
        const projectsData = await projectService.getAllProjects();
        dispatch(fetchProjectsSuccess(projectsData));
      } catch (error) {
        dispatch(fetchProjectsFail((error as Error).message));
      }
    };
    
    loadProjects();
  }, [dispatch]);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {isLoading ? (
        <LinearProgress sx={{ my: 4 }} />
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {/* Summary Statistics */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="h3" color="primary">
                      {projects.length}
                    </Typography>
                    <Typography variant="body1">Total Projects</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="h3" color="secondary">
                      12
                    </Typography>
                    <Typography variant="body1">Tasks in Progress</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center" p={2}>
                    <Typography variant="h3" color="success.main">
                      8
                    </Typography>
                    <Typography variant="body1">Completed Tasks</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Recent Projects */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Recent Projects
                </Typography>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<AddIcon />}
                  component={RouterLink}
                  to="/projects"
                >
                  View All
                </Button>
              </Box>
              
              {projects.length === 0 ? (
                <Alert severity="info">
                  No projects yet. Create your first project to get started.
                </Alert>
              ) : (
                <List>
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id}>
                      <ListItem 
                        button 
                        component={RouterLink} 
                        to={`/projects/${project.id}`}
                      >
                        <ListItemText
                          primary={project.name}
                          secondary={project.description.length > 60 
                            ? `${project.description.substring(0, 60)}...` 
                            : project.description}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
          
          {/* Recent Activity - Placeholder */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Alert severity="info" sx={{ my: 2 }}>
                  This is a placeholder. In a complete implementation, this would display recent activity on your projects.
                </Alert>
                <Box textAlign="center" py={4}>
                  <Typography variant="body2" color="textSecondary">
                    The activity feed would show updates like new tasks, comments, and project changes.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    component={RouterLink}
                    to="/projects"
                  >
                    View All Projects
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    component={RouterLink}
                    to="/settings"
                  >
                    Profile Settings
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    disabled
                  >
                    Reports
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard; 