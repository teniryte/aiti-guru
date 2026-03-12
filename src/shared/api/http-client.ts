import axios, { AxiosError } from 'axios';
import { env } from '@/shared/config/env';
import { getAccessToken } from '@/entities/session/lib/token-storage';
import { ApiError } from './api-error';

const FALLBACK_API_ERROR_MESSAGE = 'API request failed';

function getApiErrorMessage(error: AxiosError<unknown>): string {
  const message = error.response?.data;

  if (typeof message === 'object' && message !== null && 'message' in message) {
    const responseMessage = message.message;
    if (typeof responseMessage === 'string' && responseMessage.length > 0) {
      return responseMessage;
    }
  }

  if (typeof error.message === 'string' && error.message.length > 0) {
    return error.message;
  }

  return FALLBACK_API_ERROR_MESSAGE;
}

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

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }

    if (axios.isAxiosError(error) && error.response != null) {
      return Promise.reject(
        new ApiError(
          getApiErrorMessage(error),
          error.response.status,
          error.response.data,
        ),
      );
    }

    return Promise.reject(error);
  },
);
