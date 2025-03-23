import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box, CircularProgress } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useTranslation } from 'react-i18next';
import { Project } from '../../../entities/project/model/types';
import styles from './Sidebar.module.scss';

interface ProjectsListProps {
  loading: boolean;
  projects: Project[];
  onProjectSelect: (id: string) => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  loading,
  projects,
  onProjectSelect,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Box className={styles.loading}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (projects.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary" className={styles.emptyText}>
        {t('projects.empty')}
      </Typography>
    );
  }

  return (
    <List className={styles.projectsList}>
      {projects.map((project) => (
        <ListItem 
          key={project.id}
          onClick={() => onProjectSelect(project.id)}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <FolderIcon style={{ color: project.color || '#ccc' }} />
          </ListItemIcon>
          <ListItemText primary={project.name} />
        </ListItem>
      ))}
    </List>
  );
}; 