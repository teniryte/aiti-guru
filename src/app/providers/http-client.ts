import { createHttpClient } from '@/shared/api/http-client';
import { configureHttpClient } from '@/shared/api/configured-client';
import { getAccessToken, clearSessionTokens } from '@/entities/session/lib/token-storage';
import { authKeys } from '@/entities/session/api/auth.keys';
import { queryClient } from './query-client';

const httpClient = createHttpClient({
  tokenProvider: getAccessToken,
  onUnauthorized: () => {
    clearSessionTokens();
    queryClient.removeQueries({ queryKey: authKeys.all });
    window.location.href = '/login';
  },
});

configureHttpClient(httpClient);
