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
      const pageOptions = {
        limit: normalizedQuery.limit,
              skip: normalizedQuery.skip,
              sortBy: normalizedQuery.sortBy,
              order: normalizedQuery.order,
      };
      switch (normalizedQuery.mode) {
        case 'list':
          return mapProductsListDtoToProductsPage(
            await getProducts({
              ...pageOptions,
              signal,
            }),
          );
        case 'search':
          return mapProductsListDtoToProductsPage(
            await searchProducts({
              q: normalizedQuery.q,
              ...pageOptions,
              signal,
            }),
          );
      }
    },
    staleTime: 30_000,
  });
}

export const productQueries = {
  list: getProductsListQuery,
};
