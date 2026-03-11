import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppProgress } from '@/widgets/app-progress';

export const Route = createRootRoute({
  component: () => (
    <>
      <AppProgress />
      <Outlet />

      <TanStackRouterDevtools />
    </>
  ),
});
