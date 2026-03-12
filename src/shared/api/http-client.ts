import axios from 'axios';
import { env } from '@/shared/config/env';
import { getAccessToken } from '@/entities/session/lib/token-storage';

export const httpClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
