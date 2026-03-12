import { ProductsPaginationControl } from '@/features/products/change-products-filters';
import styles from './products-list-section.module.scss';

interface ProductsListSectionFooterProps {
  total: number;
  skip: number;
  limit: number;
}

export function ProductsListSectionFooter({
  total,
  skip,
  limit,
}: ProductsListSectionFooterProps) {
  const from = total === 0 ? 0 : skip + 1;
  const to = Math.min(skip + limit, total);

  return (
    <div className={styles.footer}>
      <p className={styles.info}>
        <span className={styles.infoMuted}>Показано </span>
        <span>{from}-{to} </span>
        <span className={styles.infoMuted}>из </span>
        <span>{total}</span>
      </p>

      <ProductsPaginationControl total={total} limit={limit} />
    </div>
  );
}
