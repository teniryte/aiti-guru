import type { Product } from '@/entities/product';

export function getProductsTableRows(items: Product[]) {
  return items.map((product) => ({
    id: product.id,
    product,
  }));
}
