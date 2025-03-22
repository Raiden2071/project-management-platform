import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Project } from '../model/types';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  return (
    <Card className={styles.projectCard}>
      <CardContent className={styles.content}>
        <Box
          className={styles.colorIndicator}
          sx={{ backgroundColor: project.color || '#cccccc' }}
        />
        
        <div className={styles.projectInfo}>
          <Typography variant="h6" component="div">
            {project.name}
          </Typography>
          
          <div className={styles.actions}>
            {onEdit && (
              <IconButton
                size="small"
                onClick={() => onEdit(project)}
                aria-label="edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            
            {onDelete && (
              <IconButton
                size="small"
                onClick={() => onDelete(project.id)}
                aria-label="delete"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 