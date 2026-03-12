import {
  normalizeProductsQuery,
  type ProductsQuery,
} from '../model/product.query';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (query: ProductsQuery) => [...productKeys.lists(), normalizeProductsQuery(query)] as const,
  creates: () => [...productKeys.all, 'create'] as const,
};
