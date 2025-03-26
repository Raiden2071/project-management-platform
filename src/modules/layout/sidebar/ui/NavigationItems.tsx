import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';

export const NavigationItems: React.FC = () => {
  const { t } = useTranslation();
  const handleAddTask = () => {
    // setSelectedTaskId(null);
    // setTaskFormOpen(true);
  };

  return (
    <List>
      <ListItemButton onClick={handleAddTask}>
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
      
      {/* <ListItemButton>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary={t('nav.tasks')} />
      </ListItemButton> */}
    </List>
  );
}; 