import type { AuthUser, LoginCredentials, LoginResponse } from '../model/session.types';
import { loginResponseSchema, meResponseSchema } from './auth.contracts';
import { getHttpClient } from '@/shared/api/configured-client';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await getHttpClient().post<unknown>('/auth/login', {
      username: credentials.username,
      password: credentials.password,
      ...(credentials.expiresInMins != null && { expiresInMins: credentials.expiresInMins }),
    });

    return loginResponseSchema.parse(data);
  },

  async getMe(): Promise<AuthUser> {
    const { data } = await getHttpClient().get<unknown>('/auth/me');

    return meResponseSchema.parse(data);
  },
};
