export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO формат даты
  projectId?: string;
  projectName?: string; // Название проекта для отображения
  createdAt: string; // ISO формат даты
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt'>;

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Перечисление для фильтров задач
export enum TaskFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
  TODAY = 'today',
  UPCOMING = 'upcoming',
  OVERDUE = 'overdue'
} 