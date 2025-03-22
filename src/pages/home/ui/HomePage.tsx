import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useTasks, tasksMutations } from '../../../entities/task/model/hooks';
import { useProjects, projectsMutations } from '../../../entities/project/model/hooks';
import { TaskList } from '../../../features/task-list/ui/TaskList';
import { TaskForm } from '../../../features/task-form/ui/TaskForm';
import { ProjectForm } from '../../../features/project-form/ui/ProjectForm';
import { Header } from '../../../widgets/header/ui/Header';
import { Sidebar } from '../../../widgets/sidebar/ui/Sidebar';
import { Task } from '../../../entities/task/model/types';
import { Project } from '../../../entities/project/model/types';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  // Состояние UI
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Получение данных с помощью SWR
  const { tasks, isLoading: tasksLoading, error: tasksError } = useTasks();
  const { projects, isLoading: projectsLoading } = useProjects();
  
  // Находим выбранную задачу для редактирования
  const selectedTask = selectedTaskId 
    ? tasks.find(task => task.id === selectedTaskId) 
    : null;
  
  // Находим выбранный проект для фильтрации задач
  const filteredTasks = selectedProjectId
    ? tasks.filter(task => task.projectId === selectedProjectId)
    : tasks;
  
  // Обработчики действий
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleAddTask = () => {
    setSelectedTaskId(null);
    setTaskFormOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setSelectedTaskId(task.id);
    setTaskFormOpen(true);
  };
  
  const handleTaskFormClose = () => {
    setTaskFormOpen(false);
    setSelectedTaskId(null);
  };
  
  const handleSubmitTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (selectedTaskId) {
      await tasksMutations.updateTask({
        ...taskData,
        id: selectedTaskId,
        createdAt: selectedTask?.createdAt || new Date().toISOString()
      });
    } else {
      await tasksMutations.addTask(taskData);
    }
  };
  
  const handleToggleTaskStatus = async (id: string) => {
    await tasksMutations.toggleTaskStatus(id);
  };
  
  const handleDeleteTask = async (id: string) => {
    await tasksMutations.deleteTask(id);
  };
  
  const handleAddProject = () => {
    setProjectFormOpen(true);
  };
  
  const handleProjectFormClose = () => {
    setProjectFormOpen(false);
  };
  
  const handleSubmitProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    await projectsMutations.addProject(projectData);
  };
  
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId === selectedProjectId ? null : projectId);
  };
  
  // Заголовок страницы (зависит от выбранного проекта)
  const pageTitle = selectedProjectId 
    ? `${t('tasks.title')} - ${projects.find(p => p.id === selectedProjectId)?.name}`
    : t('tasks.title');
  
  return (
    <div className={styles.root}>
      <Header 
        onToggleSidebar={handleToggleSidebar}
        onAddTask={handleAddTask}
      />
      
      <Sidebar
        open={sidebarOpen}
        loading={projectsLoading}
        projects={projects}
        onAddProject={handleAddProject}
        onProjectSelect={handleSelectProject}
      />
      
      <main className={`${styles.content} ${sidebarOpen ? styles.contentShift : ''}`}>
        <div className={styles.toolbar} />
        
        <Container maxWidth="lg" className={styles.container}>
          <Box className={styles.pageHeader}>
            <Typography variant="h4" component="h1">
              {pageTitle}
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddTask}
            >
              {t('tasks.add')}
            </Button>
          </Box>
          
          <Paper elevation={2} className={styles.taskListContainer}>
            <TaskList
              tasks={filteredTasks}
              isLoading={tasksLoading}
              error={tasksError}
              onToggle={handleToggleTaskStatus}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </Paper>
        </Container>
      </main>
      
      {/* Формы в модальных окнах */}
      <TaskForm
        open={taskFormOpen}
        onClose={handleTaskFormClose}
        onSubmit={handleSubmitTask}
        initialValues={selectedTask || undefined}
        projects={projects}
      />
      
      <ProjectForm
        open={projectFormOpen}
        onClose={handleProjectFormClose}
        onSubmit={handleSubmitProject}
      />
    </div>
  );
}; 