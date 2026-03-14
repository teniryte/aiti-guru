import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productQueries } from '@/entities/product';
import { ProductsTable } from '@/widgets/products-table';
import { getProductsSearchQuery, useProductsFilters, type ProductsSearch } from '@/features/products/change-products-filters';
import { ProductsListSectionFooter } from './products-list-section-footer';
import { ProductsListSectionHeader } from './products-list-section-header';
import styles from './products-list-section.module.scss';

interface ProductsListSectionProps {
  search: ProductsSearch;
}

export function ProductsListSection({ search }: ProductsListSectionProps) {
  const query = useQuery({
    ...productQueries.list(getProductsSearchQuery(search)),
    placeholderData: (previousData) => previousData,
  });
  const { setPage } = useProductsFilters();

  useEffect(() => {
    if (query.data == null) {
      return;
    }

    const totalPages = Math.max(1, Math.ceil(query.data.total / search.limit));

    if (search.page > totalPages) {
      setPage(totalPages);
    }
  }, [query.data, search.page, setPage]);

  return (
    <section className={styles.section}>
      <ProductsListSectionHeader
        isRefreshing={query.isFetching && !query.isPending}
        onRefresh={() => query.refetch()}
      />

      <ProductsTable
        items={query.data?.items ?? []}
        isPending={query.isPending}
        isFetching={query.isFetching && !query.isPending}
        error={query.error}
        onRetry={() => query.refetch()}
      />

      <ProductsListSectionFooter
        total={query.data?.total ?? 0}
        skip={query.data?.skip ?? 0}
        limit={search.limit}
      />
    </section>
  );
}
