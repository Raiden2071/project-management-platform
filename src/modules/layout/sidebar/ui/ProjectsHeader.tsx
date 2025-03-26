import React from 'react';
import { Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.scss';

interface ProjectsHeaderProps {
  onAddProject: () => void;
}

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ onAddProject }) => {
  const { t } = useTranslation();

  return (
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
  );
}; 