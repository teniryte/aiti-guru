import { Icon } from '@/shared/assets/icon';
import { IconButton } from '@/shared/ui/icon-button';
import { AddProductButton } from '@/features/products/add-product';
import styles from './products-list-section.module.scss';

interface ProductsListSectionHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function ProductsListSectionHeader({
  isRefreshing,
  onRefresh,
}: ProductsListSectionHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Все позиции</h2>

      <div className={styles.headerActions}>
        <IconButton
          icon={<Icon name="refresh" width={18} height={18} className={styles.refreshIcon} />}
          onClick={onRefresh}
          isLoading={isRefreshing}
          aria-label="Обновить список товаров"
        />
        <AddProductButton />
      </div>
    </div>
  );
}
