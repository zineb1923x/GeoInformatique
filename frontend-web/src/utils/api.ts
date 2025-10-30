import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL,
  timeout: 15000
});

api.interceptors.request.use((config) => {
  // Add auth token here when available
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    return Promise.reject(error);
  }
);
