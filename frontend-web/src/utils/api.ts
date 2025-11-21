import axios from 'axios';
import { handleMock } from './mock';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
const TOKEN_KEY = 'sadaka_web_token';

export const api = axios.create({
  baseURL,
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const useMocks = String(import.meta.env.VITE_USE_MOCKS || '0') === '1';
    const isNetwork = !error.response;
    if (useMocks || isNetwork) {
      try {
        const mock = await handleMock(error.config || {});
        return Promise.resolve({
          ...mock,
          config: error.config,
          headers: {},
          statusText: 'OK'
        } as any);
      } catch (e) {
        // fallthrough to original error
      }
    }
    const message = error?.response?.data?.message || error?.message || 'Erreur réseau';
    return Promise.reject(new Error(message));
  }
);
