import { authApi } from '@/entities/session/api/auth.api';
import type { LoginCredentials } from '@/entities/session/model/session.types';

export const loginMutation = {
  mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
  retry: 0,
} as const;
