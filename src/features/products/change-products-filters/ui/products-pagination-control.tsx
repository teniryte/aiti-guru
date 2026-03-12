import { Pagination } from '@/shared/ui/pagination';
import { useProductsFilters } from '../model/use-products-filters';

interface ProductsPaginationControlProps {
  total: number;
  limit: number;
}

export function ProductsPaginationControl({ total, limit }: ProductsPaginationControlProps) {
  const { filters, setPage } = useProductsFilters();
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <Pagination
      currentPage={Math.min(filters.page, totalPages)}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}
