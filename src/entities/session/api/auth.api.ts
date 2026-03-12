import type { AuthUser, LoginCredentials, LoginResponse } from '../model/session.types';
import { loginResponseSchema, meResponseSchema } from './auth.contracts';
import { httpClient } from '@/shared/api/http-client';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await httpClient.post<unknown>('/auth/login', {
      username: credentials.username,
      password: credentials.password,
      ...(credentials.expiresInMins != null && { expiresInMins: credentials.expiresInMins }),
    });
    return loginResponseSchema.parse(data);
  },

  async getMe(): Promise<AuthUser> {
    const { data } = await httpClient.get<unknown>('/auth/me');
    return meResponseSchema.parse(data);
  },
};
