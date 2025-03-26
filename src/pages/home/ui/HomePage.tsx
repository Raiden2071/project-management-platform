import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useTasks, tasksMutations } from '../../../entities/task/model/hooks';
import { useProjects, projectsMutations } from '../../../entities/project/model/hooks';
import { TaskList } from '../../../modules/tasks/task-list/ui/TaskList';
import { Layout } from '../../../modules/layout/layout/ui/Layout';
import { Task } from '../../../entities/task/model/types';
import { Project } from '../../../entities/project/model/types';
import styles from './HomePage.module.scss';
import { TaskFormDialog } from '../../../modules/tasks/task-form-dialog/ui/TaskFormDialog';
import { ProjectFormDialog } from '../../../modules/projects/project-form-dialog/ui/ProjectFormDialog';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  const { tasks, isLoading: tasksLoading, error: tasksError } = useTasks();
  const { projects, isLoading: projectsLoading } = useProjects();
  
  const selectedTask = selectedTaskId 
    ? tasks.find(task => task.id === selectedTaskId) 
    : null;
  
  const filteredTasks = selectedProjectId
    ? tasks.filter(task => task.projectId === selectedProjectId)
    : tasks;
  
  const handleAddTask = () => {
    setSelectedTaskId(null);
    setTaskFormOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setSelectedTaskId(task.id);
    setTaskFormOpen(true);
  };
  
  const handleTaskFormClose = () => {
    setTaskFormOpen(false);
    setSelectedTaskId(null);
  };
  
  const handleSubmitTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (selectedTaskId) {
      await tasksMutations.updateTask({
        ...taskData,
        id: selectedTaskId,
        createdAt: selectedTask?.createdAt || new Date().toISOString()
      });
    } else {
      await tasksMutations.addTask(taskData);
    }
  };
  
  const handleToggleTaskStatus = async (id: string) => {
    await tasksMutations.toggleTaskStatus(id);
  };
  
  const handleDeleteTask = async (id: string) => {
    await tasksMutations.deleteTask(id);
  };
  
  const handleAddProject = () => {
    setProjectFormOpen(true);
  };
  
  const handleProjectFormClose = () => {
    setProjectFormOpen(false);
  };
  
  const handleSubmitProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    await projectsMutations.addProject(projectData);
  };
  
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId === selectedProjectId ? null : projectId);
  };
  
  const pageTitle = selectedProjectId 
    ? `${t('tasks.title')} - ${projects.find(p => p.id === selectedProjectId)?.name}`
    : t('tasks.title');
  
  return (
    <Layout
      projects={projects}
      projectsLoading={projectsLoading}
      onAddProject={handleAddProject}
      onProjectSelect={handleSelectProject}
    >
      <Container maxWidth="lg" className={styles.container}>
        <Box className={styles.pageHeader}>
          <Typography variant="h4" component="h1">
            {pageTitle}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddTask}
          >
            {t('tasks.add')}
          </Button>
        </Box>
        
        <Paper elevation={0} className={styles.taskListContainer}>
          <TaskList
            tasks={filteredTasks}
            isLoading={tasksLoading}
            error={tasksError}
            onToggle={handleToggleTaskStatus}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </Paper>
      </Container>
      
      <TaskFormDialog
        open={taskFormOpen}
        onClose={handleTaskFormClose}
        onSubmit={handleSubmitTask}
        initialValues={selectedTask || undefined}
        projects={projects}
      />
      
      <ProjectFormDialog
        open={projectFormOpen}
        onClose={handleProjectFormClose}
        onSubmit={handleSubmitProject}
      />
    </Layout>
  );
};
