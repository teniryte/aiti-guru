import { z } from 'zod';

export const addProductSchema = z.object({
  name: z.string().trim().min(1, 'Введите название товара'),
  price: z.coerce.number().positive('Цена должна быть больше 0'),
  rating: z
    .number({ message: 'Укажите рейтинг' })
    .min(0, 'Рейтинг не может быть меньше 0')
    .max(5, 'Рейтинг не может быть больше 5'),
  vendor: z.string().trim().min(1, 'Выберите вендора'),
  article: z.string().trim().min(1, 'Введите артикул'),
});

export type AddProductFormInput = z.input<typeof addProductSchema>;
export type AddProductFormValues = z.infer<typeof addProductSchema>;
