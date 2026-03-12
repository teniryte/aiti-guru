import { queryOptions } from '@tanstack/react-query';
import {
  getProducts,
  searchProducts,
} from './product.api';
import {
  mapProductsListDtoToProductsPage,
} from './product.mapper';
import { productKeys } from './product.keys';
import {
  normalizeProductsQuery,
  type ProductsQuery,
} from '../model/product.query';

export function getProductsListQuery(query: ProductsQuery) {
  const normalizedQuery = normalizeProductsQuery(query);

  return queryOptions({
    queryKey: productKeys.list(normalizedQuery),
    queryFn: async ({ signal }) => {
      switch (normalizedQuery.mode) {
        case 'list':
          return mapProductsListDtoToProductsPage(
            await getProducts({
              limit: normalizedQuery.limit,
              skip: normalizedQuery.skip,
              sortBy: normalizedQuery.sortBy,
              order: normalizedQuery.order,
              signal,
            }),
          );
        case 'search':
          return mapProductsListDtoToProductsPage(
            await searchProducts({
              q: normalizedQuery.q,
              limit: normalizedQuery.limit,
              skip: normalizedQuery.skip,
              sortBy: normalizedQuery.sortBy,
              order: normalizedQuery.order,
              signal,
            }),
          );
      }
    },
    staleTime: 30_000,
  });
}
