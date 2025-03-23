import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { Project } from '../../../entities/project/model/types';
import { TwitterPicker, ColorResult } from 'react-color';
import styles from './ProjectForm.module.scss';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  initialValues?: Project;
}

const colorPresets = [
  '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
  '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'
];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues
}) => {
  const { t } = useTranslation();
  
  const [name, setName] = useState('');
  const [color, setColor] = useState('#FCB900');
  const [nameError, setNameError] = useState('');
  
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setColor(initialValues.color || '#FCB900');
    } else {
      setName('');
      setColor('#FCB900');
    }
    setNameError('');
  }, [initialValues, open]);
  
  const validateForm = (): boolean => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError(t('form.nameRequired'));
      isValid = false;
    } else {
      setNameError('');
    }
    
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const projectData: Omit<Project, 'id' | 'createdAt'> = {
      name: name.trim(),
      color,
    };
    
    onSubmit(projectData);
    onClose();
  };
  
  const handleColorChange = (colorResult: ColorResult) => {
    setColor(colorResult.hex);
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialValues ? t('projects.edit') : t('projects.add')}
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} className={styles.formContent}>
            <TextField
              label={t('projects.name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              error={!!nameError}
              helperText={nameError}
              autoFocus
              margin="normal"
            />
            
            <div>
              <InputLabel>{t('projects.color')}</InputLabel>
              <div className={styles.colorPickerContainer}>
                <TwitterPicker
                  color={color}
                  onChangeComplete={handleColorChange}
                  colors={colorPresets}
                  width="100%"
                />
              </div>
              <FormHelperText>{t('form.selectColor')}</FormHelperText>
            </div>
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