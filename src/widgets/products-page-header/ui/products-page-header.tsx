import { ProductsSearchInput } from '@/features/products/change-products-filters';
import styles from './products-page-header.module.scss';

export function ProductsPageHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <span className={styles.badge}>Тестовое Aiti Guru</span>
        <h1 className={styles.title}>Товары</h1>
      </div>

      <div className={styles.searchWrapper}>
        <ProductsSearchInput />
      </div>
    </header>
  );
}
