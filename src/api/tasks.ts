import { Task } from '../modules/tasks/model/types';
import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = 'tasks_data';

const getStoredTasks = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error reading tasks from localStorage:', error);
    return [];
  }
};

const setStoredTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

const initializeTasks = (): void => {
  if (getStoredTasks().length === 0) {
    const sampleTasks: Task[] = [
      {
        id: uuidv4(),
        title: 'Learn React',
        description: 'Complete React course on YouTube',
        completed: false,
        priority: 'high',
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Learn TypeScript',
        description: 'Read TypeScript documentation',
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Create project',
        description: 'Develop project using React and TypeScript',
        completed: false,
        priority: 'low',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];
    setStoredTasks(sampleTasks);
  }
};

initializeTasks();

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return getStoredTasks();
  },

  getTaskById: async (id: string): Promise<Task | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const tasks = getStoredTasks();
    return tasks.find(task => task.id === id);
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    
    const tasks = getStoredTasks();
    const updatedTasks = [...tasks, newTask];
    setStoredTasks(updatedTasks);
    
    return newTask;
  },

  updateTask: async (updatedTask: Task): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const tasks = getStoredTasks();
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    
    setStoredTasks(updatedTasks);
    return updatedTask;
  },

  deleteTask: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const tasks = getStoredTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    setStoredTasks(updatedTasks);
  },

  toggleTaskStatus: async (id: string): Promise<Task | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return undefined;
    
    const updatedTask = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed,
    };
    
    tasks[taskIndex] = updatedTask;
    setStoredTasks(tasks);
    
    return updatedTask;
  },
}; 