import { mockData } from './api';
import { Project } from '../store/slices/projectsSlice';

// For demo purposes, we'll simulate API calls
const projectService = {
  getAllProjects: async (): Promise<Project[]> => {
    // In a real app, this would make an API call
    // return apiClient.get('/projects');
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...mockData.projects];
  },
  
  getProjectById: async (id: string): Promise<Project> => {
    // In a real app, this would make an API call
    // return apiClient.get(`/projects/${id}`);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const project = mockData.projects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    
    return { ...project };
  },
  
  createProject: async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    // In a real app, this would make an API call
    // return apiClient.post('/projects', projectData);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to mock data
    mockData.projects.push(newProject);
    
    return newProject;
  },
  
  updateProject: async (id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> => {
    // In a real app, this would make an API call
    // return apiClient.put(`/projects/${id}`, projectData);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = mockData.projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    // Update the project
    const updatedProject: Project = {
      ...mockData.projects[index],
      ...projectData,
      updatedAt: new Date().toISOString(),
    };
    
    mockData.projects[index] = updatedProject;
    
    return updatedProject;
  },
  
  deleteProject: async (id: string): Promise<{ success: boolean }> => {
    // In a real app, this would make an API call
    // return apiClient.delete(`/projects/${id}`);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockData.projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    // Remove the project
    mockData.projects.splice(index, 1);
    
    // Also remove related tasks
    delete mockData.tasks[id];
    
    return { success: true };
  },
};

export default projectService; 