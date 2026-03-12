import clsx from 'clsx';
import { Icon } from '@/shared/assets/icon';
import styles from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPagesWindow(currentPage: number, totalPages: number, maxVisiblePages: number) {
  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxVisiblePages - 1);
  start = Math.max(1, end - maxVisiblePages + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function Pagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = getPagesWindow(currentPage, totalPages, maxVisiblePages);

  return (
    <nav className={clsx(styles.pagination, className)} aria-label="Пагинация">
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Предыдущая страница"
      >
        <Icon name="caret-left" width={20} height={20} />
      </button>

      <div className={styles.pages}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={clsx(styles.page, page === currentPage && styles.pageActive)}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Следующая страница"
      >
        <Icon name="caret-right" width={20} height={20} />
      </button>
    </nav>
  );
}
