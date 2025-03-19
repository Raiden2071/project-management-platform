import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  LinearProgress,
  Fab,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

import { RootState } from '../../store/store';
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFail,
  addProject,
  deleteProject,
} from '../../store/slices/projectsSlice';
import projectService from '../../services/projectService';

const ProjectsList = () => {
  const dispatch = useDispatch();
  const { projects, isLoading, error } = useSelector((state: RootState) => state.projects);

  // State for the create/edit project dialog
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDueDate, setProjectDueDate] = useState('');

  // State for the delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Load projects when the component mounts
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

  // Open the dialog for creating a new project
  const handleCreateProject = () => {
    setDialogTitle('Create New Project');
    setProjectName('');
    setProjectDescription('');
    setProjectDueDate('');
    setOpen(true);
  };

  // Handle dialog submission
  const handleSubmit = async () => {
    // Validate inputs
    if (!projectName.trim()) {
      // Show error or disable submit button
      return;
    }

    try {
      // Create a new project
      const newProject = await projectService.createProject({
        name: projectName,
        description: projectDescription,
        dueDate: projectDueDate || new Date().toISOString().split('T')[0],
      });

      // Add to store
      dispatch(addProject(newProject));

      // Close dialog
      setOpen(false);
    } catch (error) {
      // Handle error (could set an error state and show it in the dialog)
      console.error('Failed to create project:', error);
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  // Confirm and delete project
  const handleDeleteConfirm = async () => {
    if (projectToDelete) {
      try {
        await projectService.deleteProject(projectToDelete);
        dispatch(deleteProject(projectToDelete));
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MM/dd/yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          My Projects
        </Typography>
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={handleCreateProject}
        >
          <AddIcon />
        </Fab>
      </Box>

      {isLoading ? (
        <LinearProgress sx={{ my: 4 }} />
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : projects.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            No projects found
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleCreateProject} 
            sx={{ mt: 2 }}
          >
            Create Your First Project
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => {
            const daysRemaining = getDaysRemaining(project.dueDate);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[6],
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="h5" component="h2" gutterBottom>
                        {project.name}
                      </Typography>
                      <IconButton size="small" onClick={() => handleDeleteClick(project.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {project.description}
                    </Typography>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Typography variant="body2" color="textSecondary">
                        Due: {formatDate(project.dueDate)}
                      </Typography>
                      
                      <Chip 
                        label={`${daysRemaining} days left`}
                        color={daysRemaining < 0 ? 'error' : daysRemaining < 3 ? 'warning' : 'success'}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                  
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary" 
                      component={RouterLink} 
                      to={`/projects/${project.id}`}
                    >
                      View Project
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Create Project Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for your new project.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            value={projectDueDate}
            onChange={(e) => setProjectDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!projectName.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectsList; 