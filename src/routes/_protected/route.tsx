import { redirect } from '@tanstack/react-router';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { hasSession } from '@/entities/session/lib/token-storage';
import { authQueries } from '@/entities/session/api/auth.queries';
import { ApiError } from '@/shared/api/api-error';

export const Route = createFileRoute('/_protected')({
  beforeLoad: () => {
    if (!hasSession()) {
      throw redirect({ to: '/login', replace: true });
    }
  },
  loader: async ({ context }) => {
    const { queryClient } = context;
    try {
      await queryClient.ensureQueryData(authQueries.me());
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        // 401 handled by http-client interceptor (clears tokens, redirects)
        throw redirect({ to: '/login', replace: true });
      }
      // Temporary API issues (network, 5xx) should not break initial render
      // with route-level error page. Downstream screens will handle own requests.
      return null;
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}
