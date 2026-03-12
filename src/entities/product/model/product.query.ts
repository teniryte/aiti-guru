import type { ProductSortField, SortOrder } from './product.types';

type BaseListParams = {
  limit: number;
  skip: number;
  sortBy?: ProductSortField;
  order?: SortOrder;
};

export type ProductsQuery =
  | ({ mode: 'list' } & BaseListParams)
  | ({ mode: 'search'; q: string } & BaseListParams);

export function normalizeProductsQuery(query: ProductsQuery): ProductsQuery {
  if (query.mode === 'list') {
    return query;
  }

  const normalizedSearch = query.q.trim();
  if (normalizedSearch.length === 0) {
    return {
      mode: 'list',
      limit: query.limit,
      skip: query.skip,
      sortBy: query.sortBy,
      order: query.order,
    };
  }

  return {
    ...query,
    q: normalizedSearch,
  };
}
