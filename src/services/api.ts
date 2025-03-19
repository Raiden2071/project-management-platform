// This is a simplified API service for demonstration purposes
// In a real-world application, you would connect to an actual backend

// Base URL for API requests
const API_URL = 'https://api.example.com';

// Headers configuration
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

// Generic fetch function
export const fetcher = async (url: string) => {
  const response = await fetch(`${API_URL}${url}`, {
    headers: getHeaders(),
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

// Generic API client for different HTTP methods
export const apiClient = {
  get: fetcher,
  
  post: async (url: string, data: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },
  
  put: async (url: string, data: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },
  
  delete: async (url: string) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  },
};

// Mock data for demonstration
export const mockData = {
  users: [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ],
  projects: [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesigning the company website for better user experience',
      dueDate: '2023-12-31',
      createdAt: '2023-01-15',
      updatedAt: '2023-01-15',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Creating a new mobile app for customers',
      dueDate: '2023-11-30',
      createdAt: '2023-02-01',
      updatedAt: '2023-02-10',
    },
  ],
  tasks: {
    '1': [
      {
        id: '101',
        projectId: '1',
        title: 'Create wireframes',
        description: 'Design wireframes for the main pages',
        status: 'done',
        assigneeId: '1',
        dueDate: '2023-03-15',
        createdAt: '2023-02-01',
        updatedAt: '2023-02-15',
      },
      {
        id: '102',
        projectId: '1',
        title: 'Implement frontend',
        description: 'Implement the frontend using React',
        status: 'in_progress',
        assigneeId: '2',
        dueDate: '2023-06-30',
        createdAt: '2023-03-01',
        updatedAt: '2023-03-01',
      },
    ],
    '2': [
      {
        id: '201',
        projectId: '2',
        title: 'Design UI',
        description: 'Design the UI for the mobile app',
        status: 'todo',
        assigneeId: '1',
        dueDate: '2023-07-15',
        createdAt: '2023-05-01',
        updatedAt: '2023-05-01',
      },
    ],
  },
}; 