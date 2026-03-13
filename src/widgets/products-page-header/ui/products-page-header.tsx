import { useQuery } from '@tanstack/react-query';
import { authQueries } from '@/entities/session/api/auth.queries';
import { useLogout } from '@/features/auth/logout';
import { ProductsSearchInput } from '@/features/products/change-products-filters';
import { Button } from '@/shared/ui/button';
import styles from './products-page-header.module.scss';

export function ProductsPageHeader() {
  const currentUserQuery = useQuery(authQueries.me());
  const logout = useLogout();

  const fullName = [currentUserQuery.data?.firstName, currentUserQuery.data?.lastName]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <span className={styles.badge}>Тестовое Aiti Guru</span>
        <h1 className={styles.title}>Товары</h1>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <ProductsSearchInput />
        </div>

        <div className={styles.userSection}>
          <span className={styles.userLabel}>Пользователь:</span>
          <span className={styles.userValue}>
            {fullName || currentUserQuery.data?.username || '—'}
          </span>
          <Button type="button" className={styles.logoutButton} onClick={logout}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
