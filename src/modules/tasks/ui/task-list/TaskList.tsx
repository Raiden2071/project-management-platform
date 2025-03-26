import React from 'react';
import { Task } from '../../model/types';
import { TaskItem } from '../../ui/task-item/TaskItem';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './TaskList.module.scss';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  onToggle: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  error,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Box className={styles.loading}>
        <CircularProgress />
        <Typography>{t('app.loading')}</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {t('app.error')}: {error.message}
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography variant="body1" color="text.secondary">
          {t('tasks.empty')}
        </Typography>
      </Box>
    );
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}; 