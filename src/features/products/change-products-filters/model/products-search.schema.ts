import { z } from 'zod';

export const productsSearchSchema = z.object({
  search: z.string().default(''),
});

export type ProductsSearchValues = z.infer<typeof productsSearchSchema>;
