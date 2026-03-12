import type { ProductsQuery } from '@/entities/product';
import type { ProductsSearch } from './products-search.schema';

export function getProductsSearchQuery(search: ProductsSearch): ProductsQuery {
  const skip = (search.page - 1) * search.limit;

  if (search.search.length > 0) {
    return {
      mode: 'search',
      q: search.search,
      limit: search.limit,
      skip,
      sortBy: search.sortBy,
      order: search.order,
    };
  }

  return {
    mode: 'list',
    limit: search.limit,
    skip,
    sortBy: search.sortBy,
    order: search.order,
  };
}
