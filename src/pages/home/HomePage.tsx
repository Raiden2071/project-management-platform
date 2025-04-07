import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { TaskList } from '../../modules/tasks/ui/task-list/TaskList';
import { Layout } from '../../modules/layout/layout/ui/Layout';
import { Task } from '../../modules/tasks/model/types';
import styles from './HomePage.module.scss';
import { TaskDialog } from '../../modules/tasks/ui/task-dialog/TaskDialog';
import { useDispatch } from 'react-redux';
import { closeTaskDialog, openTaskDialog } from '../../redux/reducers/dialogSlice';
import { useGetTasksQuery } from '../../modules/tasks/api/tasksApi';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError = null } = useGetTasksQuery();
  
  const selectedTask = selectedTaskId 
    ? tasks.find((task: Task) => task.id === selectedTaskId) 
    : null;
  
  const filteredTasks = tasks;

    const dispatch = useDispatch();
  
  const handleAddTask = () => {
    setSelectedTaskId(null);
    dispatch(openTaskDialog());
  };
  
  const handleEditTask = (task: Task) => {
    setSelectedTaskId(task.id);
    dispatch(openTaskDialog());
  };
  
  const handleTaskDialogClose = () => {
    dispatch(closeTaskDialog());
    setSelectedTaskId(null);
  };
  
  const handleSubmitTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    // if (selectedTaskId) {
    //   await tasksMutations.updateTask({
    //     ...taskData,
    //     id: selectedTaskId,
    //     createdAt: selectedTask?.createdAt || new Date().toISOString()
    //   });
    // } else {
    //   await tasksMutations.addTask(taskData);
    // }
  };
  
  const handleToggleTaskStatus = async (id: string) => {
    // await tasksMutations.toggleTaskStatus(id);
  };
  
  const handleDeleteTask = async (id: string) => {
    // await tasksMutations.deleteTask(id);
  };
  
  const pageTitle = t('tasks.title') 
  
  return (
    <Layout>
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
            error={tasksError as Error | null}
            onToggle={handleToggleTaskStatus}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </Paper>
      </Container>
      
      <TaskDialog
        onClose={handleTaskDialogClose}
        onSubmit={handleSubmitTask}
        initialValues={selectedTask || undefined}
      />
    </Layout>
  );
};
