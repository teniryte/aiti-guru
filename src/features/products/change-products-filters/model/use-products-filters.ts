import { useState } from 'react';
import type { ProductsSearchValues } from './products-search.schema';

export function useProductsFilters() {
  const [filters, setFilters] = useState<ProductsSearchValues>({ search: '' });

  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const resetFilters = () => {
    setFilters({ search: '' });
  };

  return { filters, setSearch, resetFilters };
}
