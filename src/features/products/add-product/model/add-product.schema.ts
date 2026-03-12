import { z } from 'zod';

export const addProductSchema = z.object({
  name: z.string().trim().min(1, 'Введите название товара'),
  price: z.coerce.number().positive('Цена должна быть больше 0'),
  vendor: z.string().trim().min(1, 'Выберите вендора'),
  article: z.string().trim().min(1, 'Введите артикул'),
});

export type AddProductFormInput = z.input<typeof addProductSchema>;
export type AddProductFormValues = z.infer<typeof addProductSchema>;
