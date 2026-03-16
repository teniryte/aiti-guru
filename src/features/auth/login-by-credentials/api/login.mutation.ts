import { authApi } from '@/entities/session/api/auth.api';
import type { LoginCredentials } from '@/entities/session/model/session.types';
import { SUPPRESS_SERVER_ERROR_TOAST_META_KEY } from '@/shared/lib/server-error-toast';

export const loginMutation = {
  mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
  retry: 0,
  meta: {
    [SUPPRESS_SERVER_ERROR_TOAST_META_KEY]: true,
  },
} as const;
