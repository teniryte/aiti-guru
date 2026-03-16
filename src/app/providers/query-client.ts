import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import {
  showServerErrorToast,
  shouldShowServerErrorToast,
} from '@/shared/lib/server-error-toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (shouldShowServerErrorToast(error, query.meta)) {
        showServerErrorToast();
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (shouldShowServerErrorToast(error, mutation.meta)) {
        showServerErrorToast();
      }
    },
  }),
});
