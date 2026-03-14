import { describe, expect, it } from 'vitest';
import {
  mapCreateProductResponseDtoToProduct,
  mapProductDtoToProduct,
  mapProductSortFieldToApiField,
  mapProductsListDtoToProductsPage,
} from './product.mapper';

describe('product.mapper', () => {
  it('maps sort field names for API', () => {
    expect(mapProductSortFieldToApiField('name')).toBe('title');
    expect(mapProductSortFieldToApiField('price')).toBe('price');
    expect(mapProductSortFieldToApiField('rating')).toBe('rating');
  });

  it('maps product dto and normalizes optional text values', () => {
    const product = mapProductDtoToProduct({
      id: 10,
      title: 'iPhone',
      price: 1000,
      rating: 4.8,
      brand: '   ',
      sku: '  SKU-1  ',
      category: '   ',
    });

    expect(product.vendor).toBeNull();
    expect(product.article).toBe('SKU-1');
    expect(product.category).toBeNull();
  });

  it('maps products page and preserves pagination', () => {
    const page = mapProductsListDtoToProductsPage({
      products: [
        {
          id: 1,
          title: 'A',
          price: 1,
          rating: 1,
          brand: 'B',
          sku: 'S',
          category: 'C',
        },
      ],
      total: 100,
      skip: 20,
      limit: 20,
    });

    expect(page.total).toBe(100);
    expect(page.skip).toBe(20);
    expect(page.limit).toBe(20);
    expect(page.items).toHaveLength(1);
  });

  it('uses input fallback values when create response misses optional fields', () => {
    const product = mapCreateProductResponseDtoToProduct(
      {
        id: 101,
        title: 'From API',
      },
      {
        name: 'Input Name',
        price: 123,
        rating: 4,
        vendor: '  Vendor  ',
        article: '  ART-1  ',
      },
    );

    expect(product.price).toBe(123);
    expect(product.rating).toBe(4);
    expect(product.vendor).toBe('Vendor');
    expect(product.article).toBe('ART-1');
    expect(product.category).toBeNull();
  });
});
