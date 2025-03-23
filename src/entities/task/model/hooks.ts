import useSWR, { mutate } from 'swr';
import { tasksApi } from '../../../shared/api/tasks';
import { projectsApi } from '../../../shared/api/projects';
import { Task } from './types';
import { Project } from '../../project/model/types';

// Keys for SWR
const TASKS_KEY = 'tasks';
const TASK_KEY = 'task';

export const useTasks = () => {
  const { data, error, isLoading } = useSWR(TASKS_KEY, tasksApi.getTasks);
  const { data: projects = [] } = useSWR('projects', projectsApi.getProjects);
  
  const tasksWithProjectNames = (data || []).map((task: Task) => {
    if (task.projectId) {
      const project = projects.find((p: Project) => p.id === task.projectId);
      return {
        ...task,
        projectName: project ? project.name : undefined
      };
    }
    return task;
  });
  
  return {
    tasks: tasksWithProjectNames,
    isLoading,
    error
  };
};

export const tasksMutations = {
  async addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask = await tasksApi.createTask(task);
    
    mutate(
      TASKS_KEY,
      (currentTasks: Task[] = []) => [...currentTasks, newTask],
      false
    );
    
    return newTask;
  },
  
  async updateTask(updatedTask: Task) {
    const result = await tasksApi.updateTask(updatedTask);
    
    mutate(
      TASKS_KEY,
      (currentTasks: Task[] = []) =>
        currentTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
      false
    );
    
    mutate(`${TASK_KEY}-${updatedTask.id}`, updatedTask, false);
    
    return result;
  },
  
  async deleteTask(id: string) {
    await tasksApi.deleteTask(id);
    
    mutate(
      TASKS_KEY,
      (currentTasks: Task[] = []) => currentTasks.filter(task => task.id !== id),
      false
    );
    
    mutate(`${TASK_KEY}-${id}`, null, false);
  },
  
  async toggleTaskStatus(id: string) {
    const updatedTask = await tasksApi.toggleTaskStatus(id);
    
    if (updatedTask) {
      mutate(
        TASKS_KEY,
        (currentTasks: Task[] = []) =>
          currentTasks.map(task => (task.id === id ? updatedTask : task)),
        false
      );
      
      mutate(`${TASK_KEY}-${id}`, updatedTask, false);
    }
    
    return updatedTask;
  },
}; 