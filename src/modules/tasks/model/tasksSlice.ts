import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from './types';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
      }
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer; 