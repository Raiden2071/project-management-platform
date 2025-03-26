import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import tasksReducer from '../../../modules/tasks/model/tasksSlice';
import projectsReducer from '../../../modules/projects/model/projectsSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
