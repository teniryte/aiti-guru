import { queryOptions } from '@tanstack/react-query';
import { authApi } from './auth.api';
import { authKeys } from './auth.keys';

export const authQueries = {
  me: () =>
    queryOptions({
      queryKey: authKeys.me(),
      queryFn: () => authApi.getMe(),
    }),
};
