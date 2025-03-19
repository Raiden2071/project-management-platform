import { apiClient, mockData } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// For demo purposes, we'll simulate API calls
const authService = {
  login: async (credentials: LoginCredentials) => {
    // In a real app, this would make an API call
    // return apiClient.post('/auth/login', credentials);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockData.users.find(u => u.email === credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Generate a fake token
    const token = `fake-jwt-token-${Date.now()}`;
    
    return {
      user,
      token,
    };
  },
  
  register: async (data: RegisterData) => {
    // In a real app, this would make an API call
    // return apiClient.post('/auth/register', data);
    
    // For demo, let's simulate an API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockData.users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create a new user
    const newUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
    };
    
    // Add to mock data
    mockData.users.push(newUser);
    
    // Generate a fake token
    const token = `fake-jwt-token-${Date.now()}`;
    
    return {
      user: newUser,
      token,
    };
  },
  
  logout: async () => {
    // In a real app, this might call an API endpoint
    // return apiClient.post('/auth/logout', {});
    
    // For demo, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  getCurrentUser: async () => {
    // In a real app, this would verify the token with the server
    // return apiClient.get('/auth/me');
    
    // For demo, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    // Just return the first user for demo purposes
    return {
      user: mockData.users[0],
    };
  },
};

export default authService; 