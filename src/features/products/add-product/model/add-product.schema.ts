import { z } from 'zod';

const priceSchema = z.preprocess(
  (value) => {
    if (value === '' || value == null) {
      return undefined;
    }

    if (typeof value === 'number') {
      return Number.isNaN(value) ? undefined : value;
    }

    const parsedValue = Number(value);

    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  },
  z.number({ message: 'Укажите цену' }).positive('Цена должна быть больше 0'),
);

export const addProductSchema = z.object({
  name: z.string().trim().min(1, 'Введите название товара'),
  price: priceSchema,
  rating: z
    .number({ message: 'Укажите рейтинг' })
    .min(0, 'Рейтинг не может быть меньше 0')
    .max(5, 'Рейтинг не может быть больше 5'),
  vendor: z.string().trim().min(1, 'Выберите вендора'),
  article: z.string().trim().min(1, 'Введите артикул'),
});

export type AddProductFormInput = z.input<typeof addProductSchema>;
export type AddProductFormValues = z.infer<typeof addProductSchema>;
