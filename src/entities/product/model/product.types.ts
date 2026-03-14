export type Product = {
  id: number;
  name: string;
  price: number;
  vendor: string | null;
  article: string | null;
  rating: number | null;
  category: string | null;
};

export type ProductsPage = {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductSortField = 'name' | 'price' | 'rating';

export type SortOrder = 'asc' | 'desc';

export type CreateProductInput = {
  name: string;
  price: number;
  vendor: string;
  article: string;
  rating: number;
};

export type CreateProductResult = Product;
