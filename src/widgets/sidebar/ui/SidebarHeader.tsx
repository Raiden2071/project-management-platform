import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.scss';

export const SidebarHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.drawerHeader}>
      <Typography variant="h6" component="div">
        {t('app.title')}
      </Typography>
    </div>
  );
}; 