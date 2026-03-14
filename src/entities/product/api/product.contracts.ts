import { z } from 'zod';

export const ProductDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  category: z.string(),
  brand: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
});

export const ProductsListDtoSchema = z.object({
  products: z.array(ProductDtoSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const CreateProductDtoSchema = z.object({
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  brand: z.string(),
  sku: z.string(),
});

export const CreateProductResponseDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number().optional(),
  rating: z.number().optional(),
  category: z.string().optional(),
  brand: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
});

export type ProductDto = z.infer<typeof ProductDtoSchema>;
export type ProductsListDto = z.infer<typeof ProductsListDtoSchema>;
export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;
export type CreateProductResponseDto = z.infer<typeof CreateProductResponseDtoSchema>;
