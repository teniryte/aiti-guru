import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { Toaster } from '@/shared/ui/toaster';

import './http-client';

import { queryClient } from './query-client';
import { router } from './router';
import { useEffect } from 'react';

export function AppProvider() {
  useEffect(() => {
    console.log('RENDER');
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
