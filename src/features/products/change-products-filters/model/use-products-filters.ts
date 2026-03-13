import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';
import type { ProductSortField } from '@/entities/product';
import { PRODUCTS_PAGE_LIMIT, type ProductsSearch } from './products-search.schema';

type SearchUpdater = (prev: ProductsSearch) => ProductsSearch;

export function useProductsFilters() {
  const filters = useSearch({ from: '/_protected/products' });
  const navigate = useNavigate();

  const updateSearch = useCallback((updater: SearchUpdater) => {
    navigate({
      to: '/products',
      search: updater,
      replace: true,
    });
  }, [navigate]);

  const setSearch = useCallback((search: string) => {
    updateSearch((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  }, [updateSearch]);

  const setPage = useCallback((page: number) => {
    updateSearch((prev) => ({
      ...prev,
      page,
    }));
  }, [updateSearch]);

  const setLimit = useCallback((limit: number) => {
    updateSearch((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  }, [updateSearch]);

  const toggleSort = useCallback((sortBy: ProductSortField) => {
    updateSearch((prev) => {
      return {
        ...prev,
        sortBy:
          prev.sortBy !== sortBy ? sortBy
          : prev.order === 'asc' ? sortBy
          : undefined,
        order:
          prev.sortBy !== sortBy ? 'asc'
          : prev.order === 'asc' ? 'desc'
          : undefined,
        page: 1,
      };
    });
  }, [updateSearch]);

  const resetFilters = useCallback(() => {
    navigate({
      to: '/products',
      search: {
        search: '',
        page: 1,
        limit: PRODUCTS_PAGE_LIMIT,
        sortBy: undefined,
        order: undefined,
      },
      replace: true,
    });
  }, [navigate]);

  return {
    filters,
    setSearch,
    setPage,
    setLimit,
    toggleSort,
    resetFilters,
  };
}
