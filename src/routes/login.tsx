import { redirect } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/pages/login-page';
import { hasSession } from '@/entities/session/lib/token-storage';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (hasSession()) {
      throw redirect({ to: '/products', replace: true });
    }
  },
  component: LoginPage,
});
