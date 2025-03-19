import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Record<string, Task[]>; // projectId -> tasks
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: {},
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action: PayloadAction<{ projectId: string; tasks: Task[] }>) => {
      state.isLoading = false;
      state.tasks[action.payload.projectId] = action.payload.tasks;
    },
    fetchTasksFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const { projectId } = action.payload;
      if (!state.tasks[projectId]) {
        state.tasks[projectId] = [];
      }
      state.tasks[projectId].push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const { projectId, id } = action.payload;
      const projectTasks = state.tasks[projectId];
      if (projectTasks) {
        const index = projectTasks.findIndex(t => t.id === id);
        if (index !== -1) {
          projectTasks[index] = action.payload;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      const { projectId, taskId } = action.payload;
      const projectTasks = state.tasks[projectId];
      if (projectTasks) {
        state.tasks[projectId] = projectTasks.filter(t => t.id !== taskId);
      }
    },
    clearProjectTasks: (state, action: PayloadAction<string>) => {
      delete state.tasks[action.payload];
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFail,
  addTask,
  updateTask,
  deleteTask,
  clearProjectTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer; 