import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Typography,
  Box,
  CircularProgress,
  ListItemButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderIcon from '@mui/icons-material/Folder';
import { useTranslation } from 'react-i18next';
import { Project } from '../../../entities/project/model/types';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  open: boolean;
  loading: boolean;
  projects: Project[];
  onClose?: () => void;
  onAddProject: () => void;
  onProjectSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  loading,
  projects,
  onAddProject,
  onProjectSelect,
}) => {
  const { t } = useTranslation();

  return (
    <Drawer
      className={styles.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: styles.drawerPaper,
      }}
    >
      <div className={styles.drawerHeader}>
        <Typography variant="h6" component="div">
          {t('app.title')}
        </Typography>
      </div>
      
      <Divider />
      
      <List>
       <ListItemButton>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary={t('tasks.add')} />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('nav.home')} />
        </ListItemButton>
        
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary={t('nav.tasks')} />
        </ListItemButton>
      </List>
      
      <Divider />
      
      <div className={styles.projectsHeader}>
        <Typography variant="subtitle2">
          {t('nav.projects')}
        </Typography>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={onAddProject}
        >
          {t('projects.add')}
        </Button>
      </div>
      
      {loading ? (
        <Box className={styles.loading}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <List className={styles.projectsList}>
          {projects.length === 0 ? (
            <Typography variant="body2" color="textSecondary" className={styles.emptyText}>
              {t('projects.empty')}
            </Typography>
          ) : (
            projects.map((project) => (
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
            ))
          )}
        </List>
      )}
    </Drawer>
  );
}; 