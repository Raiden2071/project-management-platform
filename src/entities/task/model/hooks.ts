import useSWR, { mutate } from 'swr';
import { tasksApi } from '../../../shared/api/tasks';
import { projectsApi } from '../../../shared/api/projects';
import { Task } from './types';
import { Project } from '../../project/model/types';

// Ключи для SWR
const TASKS_KEY = 'tasks';
const TASK_KEY = 'task';

// Хук для получения списка задач
export const useTasks = () => {
  const { data, error, isLoading } = useSWR(TASKS_KEY, tasksApi.getTasks);
  const { data: projects = [] } = useSWR('projects', projectsApi.getProjects);
  
  // Добавляем имена проектов к задачам
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

// Мутации для задач
export const tasksMutations = {
  // Добавление задачи
  async addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask = await tasksApi.createTask(task);
    
    // Обновление кэша
    mutate(
      TASKS_KEY,
      (currentTasks: Task[] = []) => [...currentTasks, newTask],
      false
    );
    
    return newTask;
  },
  
  // Обновление задачи
  async updateTask(updatedTask: Task) {
    const result = await tasksApi.updateTask(updatedTask);
    
    // Обновление кэша списка задач
    mutate(
      TASKS_KEY,
      (currentTasks: Task[] = []) =>
        currentTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
      false
    );
    
    // Обновление кэша конкретной задачи
    mutate(`${TASK_KEY}-${updatedTask.id}`, updatedTask, false);
    
    return result;
  },
  
  // Удаление задачи
  async deleteTask(id: string) {
    await tasksApi.deleteTask(id);
    
    // Обновление кэша
    mutate(
      TASKS_KEY,
      (currentTasks: Task[] = []) => currentTasks.filter(task => task.id !== id),
      false
    );
    
    // Инвалидация кэша конкретной задачи
    mutate(`${TASK_KEY}-${id}`, null, false);
  },
  
  // Изменение статуса задачи
  async toggleTaskStatus(id: string) {
    const updatedTask = await tasksApi.toggleTaskStatus(id);
    
    if (updatedTask) {
      // Обновление кэша списка задач
      mutate(
        TASKS_KEY,
        (currentTasks: Task[] = []) =>
          currentTasks.map(task => (task.id === id ? updatedTask : task)),
        false
      );
      
      // Обновление кэша конкретной задачи
      mutate(`${TASK_KEY}-${id}`, updatedTask, false);
    }
    
    return updatedTask;
  },
}; 