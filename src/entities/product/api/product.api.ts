import type { AxiosRequestConfig } from 'axios';
import type {
  CreateProductDto,
  CreateProductResponseDto,
  ProductsListDto,
} from './product.contracts';
import {
  CreateProductResponseDtoSchema,
  ProductsListDtoSchema,
} from './product.contracts';
import { mapProductSortFieldToApiField } from './product.mapper';
import type { ProductSortField, SortOrder } from '../model/product.types';
import { httpClient } from '@/shared/api/http-client';

type RequestConfig = {
  signal?: AbortSignal;
};

type BaseProductsParams = {
  limit: number;
  skip: number;
  sortBy?: ProductSortField;
  order?: SortOrder;
};

type SearchProductsParams = BaseProductsParams & {
  q: string;
};

function mapListRequestParams(params: BaseProductsParams): Record<string, string | number> {
  return {
    limit: params.limit,
    skip: params.skip,
    ...(params.sortBy != null && { sortBy: mapProductSortFieldToApiField(params.sortBy) }),
    ...(params.order != null && { order: params.order }),
  };
}

function getRequestConfig(signal?: AbortSignal): AxiosRequestConfig {
  return signal != null ? { signal } : {};
}

export async function getProducts(
  params: BaseProductsParams & RequestConfig,
): Promise<ProductsListDto> {
  const { signal, ...requestParams } = params;
  const { data } = await httpClient.get<unknown>('/products', {
    ...getRequestConfig(signal),
    params: mapListRequestParams(requestParams),
  });

  return ProductsListDtoSchema.parse(data);
}

export async function searchProducts(
  params: SearchProductsParams & RequestConfig,
): Promise<ProductsListDto> {
  const { q, signal, ...requestParams } = params;
  const { data } = await httpClient.get<unknown>('/products/search', {
    ...getRequestConfig(signal),
    params: {
      q,
      ...mapListRequestParams(requestParams),
    },
  });

  return ProductsListDtoSchema.parse(data);
}

export async function createProduct(
  payload: CreateProductDto,
): Promise<CreateProductResponseDto> {
  const { data } = await httpClient.post<unknown>('/products/add', payload);

  return CreateProductResponseDtoSchema.parse(data);
}
