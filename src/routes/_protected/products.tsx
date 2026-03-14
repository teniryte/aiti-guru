import { createFileRoute } from '@tanstack/react-router';
import { ProductsPage } from '@/pages/products-page';
import { productsSearchSchema } from '@/features/products/change-products-filters';

export const Route = createFileRoute('/_protected/products')({
  validateSearch: (search) => productsSearchSchema.parse(search),
  component: ProductsRoute,
});

function ProductsRoute() {
  const search = Route.useSearch();

  return <ProductsPage search={search} />;
}
