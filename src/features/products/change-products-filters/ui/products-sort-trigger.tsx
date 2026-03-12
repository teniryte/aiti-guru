import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { ProductSortField } from '@/entities/product';
import { Icon } from '@/shared/assets/icon';
import { useProductsFilters } from '../model/use-products-filters';
import styles from './products-sort-trigger.module.scss';

interface ProductsSortTriggerProps {
  field: ProductSortField;
  children: ReactNode;
  align?: 'left' | 'center';
}

export function ProductsSortTrigger({
  field,
  children,
  align = 'center',
}: ProductsSortTriggerProps) {
  const { filters, toggleSort } = useProductsFilters();
  const isActive = filters.sortBy === field;

  return (
    <button
      type="button"
      className={clsx(styles.trigger, styles[align], isActive && styles.active)}
      onClick={() => toggleSort(field)}
    >
      <span>{children}</span>
      <span className={styles.icon} aria-hidden="true">
        {isActive ? (filters.order === 'asc' ? '↑' : '↓') : <Icon name="sort" width={16} height={16} />}
      </span>
    </button>
  );
}
