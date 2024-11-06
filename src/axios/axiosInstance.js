
import axios from 'axios';

// Create the axios instance with a default baseURL and other configurations
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8003/api/', // Default base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to change the baseURL dynamically based on the request URL
axiosInstance.interceptors.request.use((config) => {
  // Check if the request URL includes 'user' or 'category' or 'items' or 'instructions'
  if (config.url.includes('/user') || config.url.includes('/items') || config.url.includes('/instructions') || config.url.includes('/orders') || config.url.includes('/reviews') || config.url.includes('/notifications') || config.url.includes('/orderTracking')) {
    config.baseURL = 'http://localhost:8004/api/'; 
  } else if (config.url.includes('/category')) {
    config.baseURL = 'http://localhost:8003/api/'; 
  }

  // Always return the config object
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;