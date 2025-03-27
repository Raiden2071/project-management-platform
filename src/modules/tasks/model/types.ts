export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  projectId?: string;
  projectName?: string;
  createdAt: string;
}

export type TaskDialogData = Omit<Task, 'id' | 'createdAt'>;

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export enum TaskFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
  TODAY = 'today',
  UPCOMING = 'upcoming',
  OVERDUE = 'overdue'
} 