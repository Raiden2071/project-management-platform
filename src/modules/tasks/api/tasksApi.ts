import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../model/types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/tasks`,
  }),
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ``,
    }),
    createTask: build.mutation<Task, Omit<Task, "id" | "createdAt">>({
      query: (task: Omit<Task, "id" | "createdAt">) => ({
        url: "",
        method: "POST",
        body: task,
      }),
    }),
    editTask: build.mutation<Task, Omit<Task, "createdAt">>({
      query: (task: Omit<Task, "createdAt">) => ({
        url: `/${task.id}`,
        method: "PUT",
        body: task,
      }),
    }),
    deleteTask: build.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getFilteredTasks: build.query<Task[], void>({
      query: (searchParams) => `?${searchParams}`,
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useGetFilteredTasksQuery,
} = tasksApi;
