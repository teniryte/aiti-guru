import { memo } from 'react';
import { Checkbox } from '@/shared/ui/checkbox';
import { ProductsSortTrigger } from '@/features/products/change-products-filters';
import styles from './products-table.module.scss';

interface ProductsTableHeadProps {
  allSelected: boolean;
  onToggleAll: (value: boolean) => void;
}

function ProductsTableHeadComponent({
  allSelected,
  onToggleAll,
}: ProductsTableHeadProps) {
  return (
    <div className={styles.head}>
      <div className={styles.productHead}>
        <div className={styles.checkboxCell}>
          <Checkbox value={allSelected} onChange={onToggleAll} />
        </div>
        <ProductsSortTrigger field="name" align="left">
          Наименование
        </ProductsSortTrigger>
      </div>

      <span className={styles.textCell}>Вендор</span>
      <span className={styles.textCell}>Артикул</span>
      <div className={styles.centeredCell}>
        <ProductsSortTrigger field="rating">Оценка</ProductsSortTrigger>
      </div>
      <div className={styles.centeredCell}>
        <ProductsSortTrigger field="price">Цена, ₽</ProductsSortTrigger>
      </div>
      <span className={styles.textCell}>Действия</span>
    </div>
  );
}

export const ProductsTableHead = memo(ProductsTableHeadComponent);
