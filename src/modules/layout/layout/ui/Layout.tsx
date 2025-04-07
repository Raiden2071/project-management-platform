import React, { useState } from 'react';
import { Header } from '../../header/ui/Header';
import { Sidebar } from '../../sidebar/ui/Sidebar';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.root}>
      <Header onToggleSidebar={handleToggleSidebar} />

      <Sidebar open={sidebarOpen} />

      <main className={`${styles.content} ${sidebarOpen ? styles.contentShift : ''}`}>
        <div className={styles.toolbar} />
        {children}
      </main>
    </div>
  );
}; 