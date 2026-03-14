import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import type { Product } from '@/entities/product';
import { getProductsTableRows } from '../model/get-products-table-rows';
import { ProductsTableEmpty } from './products-table-empty';
import { ProductsTableError } from './products-table-error';
import { ProductsTableHead } from './products-table-head';
import { ProductsTableRow } from './products-table-row';
import { ProductsTableSkeleton } from './products-table-skeleton';
import styles from './products-table.module.scss';

interface ProductsTableProps {
  items: Product[];
  isPending: boolean;
  isFetching?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

export function ProductsTable({
  items,
  isPending,
  isFetching = false,
  error,
  onRetry,
}: ProductsTableProps) {
  const rows = useMemo(() => getProductsTableRows(items), [items]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const hasError = error != null;

  useEffect(() => {
    setSelectedIds((prev) => {
      const next = new Set<number>();

      rows.forEach((row) => {
        if (prev.has(row.id)) {
          next.add(row.id);
        }
      });

      if (next.size === prev.size && Array.from(next).every((id) => prev.has(id))) {
        return prev;
      }

      return next;
    });
  }, [rows]);

  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id));

  const handleSelectRow = useCallback((id: number, value: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (value) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  }, []);

  const handleSelectAll = useCallback((value: boolean) => {
    setSelectedIds(value ? new Set(rows.map((row) => row.id)) : new Set());
  }, [rows]);

  const shouldDimRows = !isPending && !hasError && isFetching && rows.length > 0;

  return (
    <div className={styles.table}>
      <ProductsTableHead allSelected={allSelected} onToggleAll={handleSelectAll} />

      <div className={styles.body}>
        {isPending && <ProductsTableSkeleton />}
        {!isPending && hasError && <ProductsTableError onRetry={onRetry} />}
        {!isPending && !hasError && rows.length === 0 && <ProductsTableEmpty />}
        {!isPending && !hasError && (
          <div className={clsx(styles.rows, shouldDimRows && styles.rowsDimmed)}>
            {rows.map((row) => (
              <ProductsTableRow
                key={row.id}
                product={row.product}
                selected={selectedIds.has(row.id)}
                onSelect={handleSelectRow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
