import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openTaskDialog } from '../../../../redux/reducers/dialogSlice';

export const NavigationItems: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const openAddTaskDialog = () => {
    dispatch(openTaskDialog());
  };

  return (
    <List>
      <ListItemButton onClick={openAddTaskDialog}>
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