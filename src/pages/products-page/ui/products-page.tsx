import { useLogout } from '@/features/auth/logout';
import { ProductsPageHeader } from '@/widgets/products-page-header';
import styles from './products-page.module.scss';

export function ProductsPage() {
  const logout = useLogout();
  
  return (
    <main className={styles.page}>
      <ProductsPageHeader />

      <button type="button" onClick={logout}>
        Log out
      </button>
    </main>
  );
}
