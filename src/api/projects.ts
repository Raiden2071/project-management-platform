import { Project } from '../modules/projects/model/types';
import { v4 as uuidv4 } from 'uuid';

const PROJECTS_KEY = 'projects_data';

const getStoredProjects = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(PROJECTS_KEY);
    return storedProjects ? JSON.parse(storedProjects) : [];
  } catch (error) {
    console.error('Error reading projects from localStorage:', error);
    return [];
  }
};

const setStoredProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
};

const initializeProjects = (): void => {
  if (getStoredProjects().length === 0) {
    const sampleProjects: Project[] = [
      {
        id: uuidv4(),
        name: 'Work',
        color: '#FF5733',
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: 'Personal',
        color: '#33FF57',
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: 'Study',
        color: '#3357FF',
        createdAt: new Date().toISOString(),
      },
    ];
    setStoredProjects(sampleProjects);
  }
};

initializeProjects();

export const projectsApi = {
  getProjects: async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return getStoredProjects();
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = getStoredProjects();
    return projects.find(project => project.id === id);
  },

  createProject: async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    
    const projects = getStoredProjects();
    const updatedProjects = [...projects, newProject];
    setStoredProjects(updatedProjects);
    
    return newProject;
  },

  updateProject: async (updatedProject: Project): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const projects = getStoredProjects();
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    
    setStoredProjects(updatedProjects);
    return updatedProject;
  },

  deleteProject: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const projects = getStoredProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    setStoredProjects(updatedProjects);
  },
}; 