import { redirect } from '@tanstack/react-router';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { hasSession, clearSessionTokens } from '@/entities/session/lib/token-storage';
import { authQueries } from '@/entities/session/api/auth.queries';

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
    } catch {
      clearSessionTokens();
      throw redirect({ to: '/login', replace: true });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}
