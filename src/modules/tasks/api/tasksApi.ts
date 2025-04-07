import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task } from '../model/types'

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/tasks` }),
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ``,
    }),
    getFilteredTasks: build.query<Task[], void>({
        query: (searchParams) => `tasks?${searchParams}`,
      }),
  }),
})

export const { useGetTasksQuery, useGetFilteredTasksQuery } = tasksApi