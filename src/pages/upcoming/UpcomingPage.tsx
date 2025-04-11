import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { TaskList } from '../../modules/tasks/ui/task-list/TaskList';
import { Task } from '../../modules/tasks/model/types';
import styles from './UpcomingPage.module.scss';
import { TaskDialog } from '../../modules/tasks/ui/task-dialog/TaskDialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeTaskDialog, openTaskDialog } from '../../redux/reducers/dialogSlice';
import { setSelectedTaskId } from '../../modules/tasks/slices/tasksSlice';
import { useGetTasksQuery } from '../../modules/tasks/api/tasksApi';
import { RootState } from '../../redux/store/store';

export const UpcomingPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const selectedTaskId = useSelector((state: RootState) => state.tasks.selectedTaskId);
  
  const { data: tasks = [], isLoading: tasksLoading, error: tasksError = null } = useGetTasksQuery();
  
  const selectedTask = selectedTaskId 
    ? tasks.find((task: Task) => task.id === selectedTaskId) 
    : null;
  
  const filteredTasks = tasks;
  
  const handleAddTask = () => {
    dispatch(setSelectedTaskId(null));
    dispatch(openTaskDialog());
  };
  
  const handleTaskDialogClose = () => {
    dispatch(closeTaskDialog());
    dispatch(setSelectedTaskId(null));
  };
  
  return (
    <>
      <Container maxWidth="lg" className={styles.container}>
        <Box className={styles.pageHeader}>
          <Typography variant="h4" component="h1">
            {t('tasks.title')}
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
          />
        </Paper>
      </Container>
      
      <TaskDialog
        onClose={handleTaskDialogClose}
        initialValues={selectedTask || undefined}
      />
    </>
  );
};
