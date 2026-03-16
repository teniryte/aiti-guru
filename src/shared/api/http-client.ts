import axios, { AxiosError, type AxiosInstance } from 'axios';
import { env } from '@/shared/config/env';
import type { TokenProvider } from './token-provider';
import { ApiError } from './api-error';

const FALLBACK_API_ERROR_MESSAGE = 'API request failed';

export interface CreateHttpClientOptions {
  tokenProvider: TokenProvider;
  onUnauthorized?: () => void | Promise<void>;
}

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

export function createHttpClient(options: CreateHttpClientOptions): AxiosInstance {
  const { tokenProvider, onUnauthorized } = options;
  let isHandlingUnauthorized = false;

  const client = axios.create({
    baseURL: env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    const token = tokenProvider();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (error instanceof ApiError) {
        return Promise.reject(error);
      }

      if (axios.isAxiosError(error) && error.response != null) {
        const status = error.response.status;

        const hasActiveSession = tokenProvider() != null;

        if (status === 401 && hasActiveSession && onUnauthorized && !isHandlingUnauthorized) {
          isHandlingUnauthorized = true;
          try {
            await onUnauthorized();
          } finally {
            isHandlingUnauthorized = false;
          }
        }

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

  return client;
}
