import { z } from 'zod';

export const PRODUCTS_PAGE_LIMIT = 20;

const productSortFieldSchema = z.enum(['name', 'price', 'rating']);
const sortOrderSchema = z.enum(['asc', 'desc']);

export const productsSearchSchema = z
  .object({
    search: z.string().catch('').default(''),
    page: z.coerce.number().int().min(1).catch(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).catch(PRODUCTS_PAGE_LIMIT).default(PRODUCTS_PAGE_LIMIT),
    sortBy: productSortFieldSchema.optional().catch(undefined),
    order: sortOrderSchema.optional().catch(undefined),
  })
  .transform((value) => {
    const search = value.search.trim();
    const hasSorting = value.sortBy != null && value.order != null;

    return {
      search,
      page: value.page,
      limit: value.limit,
      sortBy: hasSorting ? value.sortBy : undefined,
      order: hasSorting ? value.order : undefined,
    };
  });

export type ProductsSearch = z.infer<typeof productsSearchSchema>;
