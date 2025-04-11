import React from 'react';
import { 
  Card, 
  Typography, 
  Checkbox, 
  IconButton, 
  Tooltip, 
  Box 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';
import FolderIcon from '@mui/icons-material/Folder';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styles from './TaskItem.module.scss';
import { Task } from '../../model/types';
import { setSelectedTaskId } from '../../slices/tasksSlice';
import { useDispatch } from 'react-redux';
import { openTaskDialog } from '../../../../redux/reducers/dialogSlice';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleEditTask = (task: Task) => {
    dispatch(setSelectedTaskId(task.id));
    dispatch(openTaskDialog());
  };
  
  const isDueDate = !!task.dueDate;
  const dueDate = isDueDate ? (typeof task.dueDate === 'string' ? parseISO(task.dueDate) : task.dueDate) : null;
  const isOverdue = isDueDate && dueDate && dueDate < new Date() && !task.completed;
  
  const cardClasses = `${styles.taskItem} ${task.completed ? styles.completed : ''}`;
  const priorityClass = styles[task.priority];
  
  const formattedDate = isDueDate && dueDate
    ? format(dueDate, 'MMM d', { locale: enUS })
    : t('tasks.noDueDate');
  
  return (
    <Card className={cardClasses}>
      <Checkbox
        checked={task.completed}
        className={styles.checkbox}
        color="primary"
      />
      
      <div className={styles.taskContent}>
        <Typography variant="body1" component="h3" className={styles.taskTitle}>
          {task.title}
        </Typography>
        
        {task.description && (
          <Typography variant="body2" className={styles.taskDescription}>
            {task.description}
          </Typography>
        )}
        
        <div className={styles.taskDetails}>
          {isDueDate && (
            <Tooltip title={isOverdue ? t('tasks.overdue') : ''}>
              <Box 
                className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}
                component="span"
              >
                <CalendarTodayIcon fontSize="small" />
                {formattedDate}
              </Box>
            </Tooltip>
          )}
          
          <Box className={`${styles.priority} ${priorityClass}`} component="span">
            <FlagIcon fontSize="small" />
            {t(`priority.${task.priority}`)}
          </Box>
          
          {task.projectId && (
            <Box className={styles.project} component="span">
              <FolderIcon fontSize="small" />
              {task.projectName}
            </Box>
          )}
        </div>
      </div>
      
      <div className={styles.actions}>
        <IconButton 
          size="small" 
          onClick={() => handleEditTask(task)}
          aria-label={t('tasks.edit')}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        
        {/* {onDelete && (
          <IconButton
            size="small"
            onClick={() => onDelete(task.id)}
            aria-label={t('form.delete')}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )} */}
      </div>
    </Card>
  );
}; 