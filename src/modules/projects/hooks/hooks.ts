import useSWR, { mutate } from 'swr';
import { Project } from '../model/types';
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

export const projectsMutations = {
  async addProject(project: Omit<Project, 'id' | 'createdAt'>) {
    const newProject = await projectsApi.createProject(project);
    
    mutate(
      PROJECTS_KEY,
      (currentProjects: Project[] = []) => [...currentProjects, newProject],
      false
    );
    
    return newProject;
  },
  
  async updateProject(updatedProject: Project) {
    const result = await projectsApi.updateProject(updatedProject);
    
    mutate(
      PROJECTS_KEY,
      (currentProjects: Project[] = []) =>
        currentProjects.map(project => (project.id === updatedProject.id ? updatedProject : project)),
      false
    );
    
    return result;
  },
  
  async deleteProject(id: string) {
    await projectsApi.deleteProject(id);
    
    mutate(
      PROJECTS_KEY,
      (currentProjects: Project[] = []) => currentProjects.filter(project => project.id !== id),
      false
    );
  },
}; 