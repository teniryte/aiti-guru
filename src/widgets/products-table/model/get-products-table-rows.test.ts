import { describe, expect, it } from 'vitest';
import { getProductsTableRows } from './get-products-table-rows';

describe('getProductsTableRows', () => {
  it('creates rows with product ids and references to product objects', () => {
    const items = [
      { id: 1, name: 'A', price: 10, rating: 4, vendor: null, article: null, category: null },
      { id: 2, name: 'B', price: 20, rating: 5, vendor: 'V', article: 'X', category: 'C' },
    ];

    const rows = getProductsTableRows(items);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ id: 1, product: items[0] });
    expect(rows[1]).toEqual({ id: 2, product: items[1] });
  });
});
