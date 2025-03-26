import useSWR, { mutate } from 'swr';
import { Project } from './types';
import { projectsApi } from '../../../api/projects';

const PROJECTS_KEY = 'projects';
const PROJECT_KEY = 'project';

export const useProjects = () => {
  const { data, error, isLoading } = useSWR(PROJECTS_KEY, projectsApi.getProjects);
  
  return {
    projects: data || [],
    isLoading,
    error,
  };
};

// Хук для получения проекта по ID
export const useProject = (id: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `${PROJECT_KEY}-${id}` : null,
    () => projectsApi.getProjectById(id)
  );
  
  return {
    project: data,
    isLoading,
    error,
  };
};

// Мутации для проектов
export const projectsMutations = {
  // Добавление проекта
  async addProject(project: Omit<Project, 'id' | 'createdAt'>) {
    const newProject = await projectsApi.createProject(project);
    
    // Обновление кэша
    mutate(
      PROJECTS_KEY,
      (currentProjects: Project[] = []) => [...currentProjects, newProject],
      false
    );
    
    return newProject;
  },
  
  // Обновление проекта
  async updateProject(updatedProject: Project) {
    const result = await projectsApi.updateProject(updatedProject);
    
    // Обновление кэша списка проектов
    mutate(
      PROJECTS_KEY,
      (currentProjects: Project[] = []) =>
        currentProjects.map(project => (project.id === updatedProject.id ? updatedProject : project)),
      false
    );
    
    return result;
  },
  
  // Удаление проекта
  async deleteProject(id: string) {
    await projectsApi.deleteProject(id);
    
    // Обновление кэша
    mutate(
      PROJECTS_KEY,
      (currentProjects: Project[] = []) => currentProjects.filter(project => project.id !== id),
      false
    );
  },
}; 