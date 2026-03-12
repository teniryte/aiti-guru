import type { QueryClient } from '@tanstack/react-query';
import { mutationOptions } from '@tanstack/react-query';
import { createProduct } from './product.api';
import {
  mapCreateProductInputToDto,
  mapCreateProductResponseDtoToProduct,
} from './product.mapper';
import { productKeys } from './product.keys';
import type { CreateProductInput, CreateProductResult } from '../model/product.types';

type CreateProductMutationOptions = {
  queryClient?: QueryClient;
};

export function createProductMutation(options: CreateProductMutationOptions = {}) {
  return mutationOptions({
    mutationKey: productKeys.creates(),
    mutationFn: async (input: CreateProductInput): Promise<CreateProductResult> => {
      const payload = mapCreateProductInputToDto(input);
      const response = await createProduct(payload);

      return mapCreateProductResponseDtoToProduct(response, input);
    },
    onSuccess: async () => {
      if (options.queryClient == null) {
        return;
      }

      await options.queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
}
