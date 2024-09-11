
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8004/api', // API base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;