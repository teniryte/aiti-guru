import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { clearSessionTokens } from '@/entities/session/lib/token-storage';
import { authKeys } from '@/entities/session/api/auth.keys';
import { toast } from '@/shared/lib/toast';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    clearSessionTokens();
    queryClient.removeQueries({ queryKey: authKeys.all });
    toast.info('Вы вышли из системы');
    navigate({ to: '/login', replace: true });
  };
}
