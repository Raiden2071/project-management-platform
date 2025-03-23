import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useTranslation } from 'react-i18next';

export const NavigationItems: React.FC = () => {
  const { t } = useTranslation();

  return (
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
  );
}; 