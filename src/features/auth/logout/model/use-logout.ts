import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { clearSessionTokens } from '@/entities/session/lib/token-storage';
import { authKeys } from '@/entities/session/api/auth.keys';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    clearSessionTokens();
    queryClient.removeQueries({ queryKey: authKeys.all });
    navigate({ to: '/login', replace: true });
  };
}
