import type { Product } from '../model/product.types';
import styles from './product-name-cell.module.scss';

type ProductNameCellProps = Pick<Product, 'name' | 'category'>;

function getProductInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || '?';
}

export function ProductNameCell({ name, category }: ProductNameCellProps) {
  return (
    <div className={styles.root}>
      <div className={styles.thumbnail} aria-hidden="true">
        {getProductInitial(name)}
      </div>

      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        <span className={styles.category}>{category ?? 'Без категории'}</span>
      </div>
    </div>
  );
}
