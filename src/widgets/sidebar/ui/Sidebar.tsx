import React from 'react';
import { Drawer, Divider } from '@mui/material';
import { Project } from '../../../entities/project/model/types';
import { SidebarHeader } from './SidebarHeader';
import { NavigationItems } from './NavigationItems';
import { ProjectsHeader } from './ProjectsHeader';
import { ProjectsList } from './ProjectsList';
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
      
      <ProjectsHeader onAddProject={onAddProject} />
      
      <ProjectsList
        loading={loading}
        projects={projects}
        onProjectSelect={onProjectSelect}
      />
    </Drawer>
  );
}; 