import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  CircularProgress, 
  Typography, 
  TextField, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  FormControl, 
  InputLabel, 
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } from '../api/tasksApi';
import { TaskDialogData } from '../model/types';

const initialTaskForm: TaskDialogData = {
  title: '',
  description: '',
  completed: false,
  priority: 'medium',
  startDate: new Date(),
};

export const TaskList: React.FC = () => {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [taskForm, setTaskForm] = useState<TaskDialogData>(initialTaskForm);

  const handleOpenDialog = () => {
    setTaskForm(initialTaskForm);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name as string]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createTask(taskForm).unwrap();
      handleCloseDialog();
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center">
        Произошла ошибка при загрузке задач. Пожалуйста, попробуйте позже.
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Список задач</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Добавить задачу
        </Button>
      </Box>

      <Paper elevation={2}>
        {tasks && tasks.length > 0 ? (
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} divider>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {task.description}
                      </Typography>
                      <Box component="span" sx={{ display: 'block' }}>
                        Приоритет: {task.priority} | Статус: {task.completed ? 'Завершено' : 'В процессе'}
                      </Box>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography>Нет доступных задач</Typography>
          </Box>
        )}
      </Paper>

      {/* Диалог создания задачи */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Создать новую задачу</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Название задачи"
            type="text"
            fullWidth
            variant="outlined"
            value={taskForm.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Описание"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={taskForm.description || ''}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Приоритет</InputLabel>
            <Select
              name="priority"
              value={taskForm.priority}
              onChange={handleSelectChange}
              label="Приоритет"
            >
              <MenuItem value="low">Низкий</MenuItem>
              <MenuItem value="medium">Средний</MenuItem>
              <MenuItem value="high">Высокий</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!taskForm.title || isCreating}
          >
            {isCreating ? <CircularProgress size={24} /> : 'Создать'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 