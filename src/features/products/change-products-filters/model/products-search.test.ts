import { describe, expect, it } from 'vitest';
import { getProductsSearchQuery } from './products-search.query';
import { productsSearchSchema } from './products-search.schema';

describe('products search', () => {
  it('normalizes search and removes incomplete sorting', () => {
    const parsed = productsSearchSchema.parse({
      search: '   iphone   ',
      page: '2',
      limit: '20',
      sortBy: 'price',
    });

    expect(parsed.search).toBe('iphone');
    expect(parsed.page).toBe(2);
    expect(parsed.limit).toBe(20);
    expect(parsed.sortBy).toBeUndefined();
    expect(parsed.order).toBeUndefined();
  });

  it('builds search-mode query when term is present', () => {
    const query = getProductsSearchQuery({
      search: 'camera',
      page: 3,
      limit: 10,
      sortBy: 'rating',
      order: 'desc',
    });

    expect(query).toEqual({
      mode: 'search',
      q: 'camera',
      limit: 10,
      skip: 20,
      sortBy: 'rating',
      order: 'desc',
    });
  });

  it('builds list-mode query when term is empty', () => {
    const query = getProductsSearchQuery({
      search: '',
      page: 1,
      limit: 20,
      sortBy: 'name',
      order: 'asc',
    });

    expect(query).toEqual({
      mode: 'list',
      limit: 20,
      skip: 0,
      sortBy: 'name',
      order: 'asc',
    });
  });
});
