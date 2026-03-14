import type {
  CreateProductDto,
  CreateProductResponseDto,
  ProductDto,
  ProductsListDto,
} from './product.contracts';
import type {
  CreateProductInput,
  Product,
  ProductSortField,
  ProductsPage,
} from '../model/product.types';
function mapOptionalTextValue(value: string | null | undefined): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value.trim();
  return normalizedValue.length > 0 ? normalizedValue : null;
}

export function mapProductSortFieldToApiField(
  field: ProductSortField,
): 'title' | 'price' | 'rating' {
  switch (field) {
    case 'name':
      return 'title';
    case 'price':
      return 'price';
    case 'rating':
      return 'rating';
  }
}

export function mapProductDtoToProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.title,
    price: dto.price,
    vendor: mapOptionalTextValue(dto.brand),
    article: mapOptionalTextValue(dto.sku),
    rating: dto.rating,
    category: mapOptionalTextValue(dto.category),
  };
}

export function mapProductsListDtoToProductsPage(dto: ProductsListDto): ProductsPage {
  return {
    items: dto.products.map(mapProductDtoToProduct),
    total: dto.total,
    skip: dto.skip,
    limit: dto.limit,
  };
}

export function mapCreateProductInputToDto(input: CreateProductInput): CreateProductDto {
  return {
    title: input.name,
    price: input.price,
    rating: input.rating,
    brand: input.vendor,
    sku: input.article,
  };
}

export function mapCreateProductResponseDtoToProduct(
  dto: CreateProductResponseDto,
  input: CreateProductInput,
): Product {
  return {
    id: dto.id,
    name: dto.title,
    price: dto.price ?? input.price,
    vendor: mapOptionalTextValue(dto.brand ?? input.vendor),
    article: mapOptionalTextValue(dto.sku ?? input.article),
    rating: dto.rating ?? input.rating,
    category: mapOptionalTextValue(dto.category),
  };
}
