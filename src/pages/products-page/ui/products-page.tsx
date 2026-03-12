import { AddProductDialog } from '@/features/products/add-product';
import type { ProductsSearch } from '@/features/products/change-products-filters';
import { ProductsPageHeader } from '@/widgets/products-page-header';
import { ProductsListSection } from '@/widgets/products-list-section';

import styles from './products-page.module.scss';

interface ProductsPageProps {
  search: ProductsSearch;
}

export function ProductsPage({ search }: ProductsPageProps) {
  return (
    <main className={styles.page}>
      <ProductsPageHeader />

      <div className={styles.content}>
        <ProductsListSection search={search} />
      </div>

      <AddProductDialog />
    </main>
  );
}
