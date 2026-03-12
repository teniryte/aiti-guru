import { useLogout } from '@/features/auth/logout';
import { useQuery } from '@tanstack/react-query';
import { authQueries } from '@/entities/session/api/auth.queries';

export function ProductsPage() {
  const logout = useLogout();
  const { data: user } = useQuery(authQueries.me());

  return (
    <main>
      <h1>Products</h1>
      <p>Protected content. You are logged in.</p>
      {user && (
        <p>
          Hello, {user.firstName} {user.lastName}
        </p>
      )}
      <button type="button" onClick={logout}>
        Log out
      </button>
    </main>
  );
}
