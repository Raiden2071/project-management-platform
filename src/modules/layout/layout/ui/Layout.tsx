import React, { useState } from 'react';
import { Header } from '../../header/ui/Header';
import { Sidebar } from '../../sidebar/ui/Sidebar';
import { Project } from '../../../../entities/project/model/types';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  projects: Project[];
  projectsLoading: boolean;
  onAddProject: () => void;
  onProjectSelect: (id: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  projects,
  projectsLoading,
  onAddProject,
  onProjectSelect,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.root}>
      <Header onToggleSidebar={handleToggleSidebar} />

      <Sidebar
        open={sidebarOpen}
        loading={projectsLoading}
        projects={projects}
        onAddProject={onAddProject}
        onProjectSelect={onProjectSelect}
      />

      <main className={`${styles.content} ${sidebarOpen ? styles.contentShift : ''}`}>
        <div className={styles.toolbar} />
        {children}
      </main>
    </div>
  );
}; 