import { useNavigate, useSearch } from '@tanstack/react-router';
import type { ProductSortField } from '@/entities/product';
import { PRODUCTS_PAGE_LIMIT, type ProductsSearch } from './products-search.schema';

type SearchUpdater = (prev: ProductsSearch) => ProductsSearch;

export function useProductsFilters() {
  const filters = useSearch({ from: '/_protected/products' });
  const navigate = useNavigate();

  const updateSearch = (updater: SearchUpdater) => {
    navigate({
      to: '/products',
      search: updater,
      replace: true,
    });
  };

  const setSearch = (search: string) => {
    updateSearch((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    updateSearch((prev) => ({
      ...prev,
      page,
    }));
  };

  const setLimit = (limit: number) => {
    updateSearch((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

  const toggleSort = (sortBy: ProductSortField) => {
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
  };

  const resetFilters = () => {
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
  };

  return {
    filters,
    setSearch,
    setPage,
    setLimit,
    toggleSort,
    resetFilters,
  };
}
