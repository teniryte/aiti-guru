import { ProductsSearchInput, useProductsFilters } from '@/features/products/change-products-filters';
import styles from './products-page-header.module.scss';

export function ProductsPageHeader() {
  const { filters, setSearch } = useProductsFilters();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Товары</h1>
      <div className={styles.searchWrapper}>
        <ProductsSearchInput value={filters.search} onChange={setSearch} />
      </div>
    </header>
  );
}
