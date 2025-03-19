import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Divider,
  LinearProgress,
  Alert,
  IconButton,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

import { RootState } from '../../store/store';
import { setCurrentProject, clearCurrentProject } from '../../store/slices/projectsSlice';
import { fetchTasksStart, fetchTasksSuccess, fetchTasksFail } from '../../store/slices/tasksSlice';
import projectService from '../../services/projectService';
import taskService from '../../services/taskService';

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
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject, isLoading: projectLoading, error: projectError } = useSelector((state: RootState) => state.projects);
  const { tasks, isLoading: tasksLoading, error: tasksError } = useSelector((state: RootState) => state.tasks);
  
  const [tabValue, setTabValue] = useState(0);
  
  // Load project and tasks when component mounts
  useEffect(() => {
    const loadProjectAndTasks = async () => {
      if (!id) return;
      
      try {
        // Fetch project details
        const projectData = await projectService.getProjectById(id);
        dispatch(setCurrentProject(projectData));
        
        // Fetch tasks for the project
        dispatch(fetchTasksStart());
        const tasksData = await taskService.getTasksByProjectId(id);
        dispatch(fetchTasksSuccess({ projectId: id, tasks: tasksData }));
      } catch (error) {
        console.error('Failed to load project or tasks:', error);
        if ((error as Error).message === 'Project not found') {
          navigate('/projects');
        }
        dispatch(fetchTasksFail((error as Error).message));
      }
    };
    
    loadProjectAndTasks();
    
    // Cleanup
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [id, dispatch, navigate]);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const isLoading = projectLoading || tasksLoading;
  const error = projectError || tasksError;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return 'Invalid Date';
    }
  };
  
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <LinearProgress />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/projects')}
          sx={{ mt: 2 }}
        >
          Back to Projects
        </Button>
      </Container>
    );
  }
  
  if (!currentProject) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Project not found</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/projects')}
          sx={{ mt: 2 }}
        >
          Back to Projects
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header with actions */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="flex-start" 
        mb={3}
      >
        <Box>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/projects')}
            sx={{ mb: 1 }}
          >
            Back to Projects
          </Button>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentProject.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Due: {formatDate(currentProject.dueDate)}
          </Typography>
        </Box>
        
        <Box>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Project details */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          {currentProject.description || 'No description provided.'}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              Created:
            </Typography>
            <Typography variant="body1">
              {formatDate(currentProject.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              Last Updated:
            </Typography>
            <Typography variant="body1">
              {formatDate(currentProject.updatedAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="textSecondary">
              Status:
            </Typography>
            <Chip 
              label="Active" 
              color="success" 
              size="small" 
              sx={{ mt: 0.5 }}
            />
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs for Tasks, Timeline, etc. */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Tasks" id="project-tab-0" />
            <Tab label="Timeline" id="project-tab-1" />
            <Tab label="Team" id="project-tab-2" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" paragraph>
            Tasks
          </Typography>
          <Alert severity="info">
            This is a placeholder. In a complete implementation, this tab would display the list of tasks for this project.
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" paragraph>
            Timeline
          </Typography>
          <Alert severity="info">
            This is a placeholder. In a complete implementation, this tab would display a timeline or Gantt chart of the project.
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" paragraph>
            Team
          </Typography>
          <Alert severity="info">
            This is a placeholder. In a complete implementation, this tab would display the team members assigned to this project.
          </Alert>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProjectDetails; 