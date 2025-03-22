import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectsState } from './types';

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Загрузка проектов началась
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Загрузка проектов успешно завершена
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.loading = false;
    },
    // Ошибка при загрузке проектов
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Добавление нового проекта
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    // Обновление существующего проекта
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    // Удаление проекта
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
  },
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer; 