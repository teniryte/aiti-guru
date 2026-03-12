import { createFileRoute } from '@tanstack/react-router';
import { getProductsListQuery } from '@/entities/product';
import { ProductsPage } from '@/pages/products-page';
import {
  getProductsSearchQuery,
  productsSearchSchema,
} from '@/features/products/change-products-filters';

export const Route = createFileRoute('/_protected/products')({
  validateSearch: (search) => productsSearchSchema.parse(search),
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(getProductsListQuery(getProductsSearchQuery(deps))),
  component: ProductsRoute,
});

function ProductsRoute() {
  const search = Route.useSearch();

  return <ProductsPage search={search} />;
}
