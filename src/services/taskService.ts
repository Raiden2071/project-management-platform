import { mockData } from './api';
import { Task, TaskStatus } from '../store/slices/tasksSlice';

// For demo purposes, we'll simulate API calls
const taskService = {
  getTasksByProjectId: async (projectId: string): Promise<Task[]> => {
    // In a real app, this would make an API call
    // return apiClient.get(`/projects/${projectId}/tasks`);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Get the tasks for the project (or empty array if none exist)
    const projectTasks = mockData.tasks[projectId as keyof typeof mockData.tasks] || [];
    return [...projectTasks];
  },
  
  getTaskById: async (projectId: string, taskId: string): Promise<Task> => {
    // In a real app, this would make an API call
    // return apiClient.get(`/projects/${projectId}/tasks/${taskId}`);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const projectTasks = mockData.tasks[projectId as keyof typeof mockData.tasks] || [];
    const task = projectTasks.find(t => t.id === taskId);
    
    if (!task) {
      throw new Error('Task not found');
    }
    
    return { ...task };
  },
  
  createTask: async (projectId: string, taskData: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    // In a real app, this would make an API call
    // return apiClient.post(`/projects/${projectId}/tasks`, taskData);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Check if project exists
    const projectExists = mockData.projects.some(p => p.id === projectId);
    if (!projectExists) {
      throw new Error('Project not found');
    }
    
    // Ensure the tasks array for this project exists
    if (!mockData.tasks[projectId as keyof typeof mockData.tasks]) {
      (mockData.tasks as any)[projectId] = [];
    }
    
    // Create a new task
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to mock data
    (mockData.tasks as any)[projectId].push(newTask);
    
    return newTask;
  },
  
  updateTask: async (
    projectId: string, 
    taskId: string, 
    taskData: Partial<Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>>
  ): Promise<Task> => {
    // In a real app, this would make an API call
    // return apiClient.put(`/projects/${projectId}/tasks/${taskId}`, taskData);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check if project and task exist
    const projectTasks = mockData.tasks[projectId as keyof typeof mockData.tasks];
    if (!projectTasks) {
      throw new Error('Project has no tasks');
    }
    
    const taskIndex = projectTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    // Update the task
    const updatedTask: Task = {
      ...projectTasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    
    projectTasks[taskIndex] = updatedTask;
    
    return updatedTask;
  },
  
  deleteTask: async (projectId: string, taskId: string): Promise<{ success: boolean }> => {
    // In a real app, this would make an API call
    // return apiClient.delete(`/projects/${projectId}/tasks/${taskId}`);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Check if project and task exist
    const projectTasks = mockData.tasks[projectId as keyof typeof mockData.tasks];
    if (!projectTasks) {
      throw new Error('Project has no tasks');
    }
    
    const taskIndex = projectTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    // Remove the task
    (mockData.tasks as any)[projectId] = projectTasks.filter(t => t.id !== taskId);
    
    return { success: true };
  },
  
  // Helper method to change task status
  updateTaskStatus: async (projectId: string, taskId: string, status: TaskStatus): Promise<Task> => {
    return taskService.updateTask(projectId, taskId, { status });
  },
};

export default taskService; 