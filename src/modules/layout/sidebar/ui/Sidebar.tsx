import React from 'react';
import { Drawer, Divider } from '@mui/material';
import { SidebarHeader } from './SidebarHeader';
import { NavigationItems } from './NavigationItems';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
}) => {
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
      <SidebarHeader />
      
      <Divider />
      
      <NavigationItems />
      
      <Divider />
      
    </Drawer>
  );
}; 