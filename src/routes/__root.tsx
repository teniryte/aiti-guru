import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { AppProgress } from '@/widgets/app-progress';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <AppProgress />
      <Outlet />

      {import.meta.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </>
  ),
});
