import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './TaskDialog.module.scss';
import { Task } from '../../model/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';

interface TaskDialogProps {
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialValues?: Task;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { t } = useTranslation();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [titleError, setTitleError] = useState('');

  // const dispatch = useDispatch();
  const tasksDialog = useSelector((state: RootState) => state.dialogs.tasksDialog);
  
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description || '');
      setPriority(initialValues.priority);
      setDueDate(initialValues.dueDate ? new Date(initialValues.dueDate) : null);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(null);
    }
    setTitleError('');
  }, [initialValues, tasksDialog.open]);
  
  const validateForm = (): boolean => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError(t('form.titleRequired'));
      isValid = false;
    } else {
      setTitleError('');
    }
    
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const taskData: Omit<Task, 'id' | 'createdAt'> = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed: initialValues?.completed || false,
      priority,
      dueDate: dueDate?.toISOString(),
    };
    
    onSubmit(taskData);
    onClose();
  };
  
  return (
    <Dialog open={tasksDialog.open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialValues ? t('tasks.edit') : t('tasks.add')}
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} className={styles.formContent}>
            <TextField
              label={t('form.title')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              error={!!titleError}
              helperText={titleError}
              autoFocus
              margin="normal"
            />
            
            <TextField
              label={t('form.description')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="priority-label">{t('tasks.priority')}</InputLabel>
              <Select
                labelId="priority-label"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                label={t('tasks.priority')}
              >
                <MenuItem value="low">{t('priority.low')}</MenuItem>
                <MenuItem value="medium">{t('priority.medium')}</MenuItem>
                <MenuItem value="high">{t('priority.high')}</MenuItem>
              </Select>
            </FormControl>
            
            <DatePicker
              label={t('tasks.dueDate')}
              value={dueDate}
              onChange={(newValue: Date | null) => setDueDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal"
                }
              }}
            />
          </Stack>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            {t('form.cancel')}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {t('form.save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 