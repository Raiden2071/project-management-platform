import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import tasksReducer from '../../modules/tasks/slices/tasksSlice';
import projectsReducer from '../../modules/projects/slices/projectsSlice';
import dialogsReducer from '../reducers/dialogSlice';
import { tasksApi } from '../../modules/tasks/api/tasksApi';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    dialogs: dialogsReducer,

    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
