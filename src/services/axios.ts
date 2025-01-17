import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-api-base-url.com',
});

// Add token to headers if it exists
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle errors globally
instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token'); // Optional: Log out user automatically
  }
  return Promise.reject(error);
});

export default instance;
