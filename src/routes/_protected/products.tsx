import { createFileRoute } from '@tanstack/react-router';
import { ProductsPage } from '@/pages/products-page';

export const Route = createFileRoute('/_protected/products')({
  component: ProductsPage,
});
