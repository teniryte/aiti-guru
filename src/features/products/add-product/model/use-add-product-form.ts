import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createProductMutation } from '@/entities/product';
import { toast } from '@/shared/lib/toast';
import {
  addProductSchema,
  type AddProductFormInput,
  type AddProductFormValues,
} from './add-product.schema';
import { useAddProductStore } from './add-product.store';

const emptyValues: AddProductFormInput = {
  name: '',
  price: '',
  rating: 4,
  vendor: '',
  article: '',
};

export function useAddProductForm(open: boolean) {
  const form = useForm<AddProductFormInput, undefined, AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: emptyValues,
  });

  const queryClient = useQueryClient();
  const closeDialog = useAddProductStore((state) => state.closeDialog);
  const mutation = useMutation(createProductMutation({ queryClient }));

  useEffect(() => {
    if (open) {
      return;
    }

    form.reset(emptyValues);
  }, [form, open]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      toast.success('Товар успешно добавлен');
      closeDialog();
      form.reset(emptyValues);
    } catch {
      form.setError('root', {
        message: 'Не удалось добавить товар. Попробуйте еще раз.',
      });
    }
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
}
