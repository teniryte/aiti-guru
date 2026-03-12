import { Icon } from '@/shared/assets/icon';
import { IconButton } from '@/shared/ui/icon-button';
import styles from './product-row-actions.module.scss';

interface ProductRowActionsProps {
  onQuickAdd?: () => void;
  onMoreClick?: () => void;
}

export function ProductRowActions({
  onQuickAdd,
  onMoreClick,
}: ProductRowActionsProps) {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.quickAdd}
        onClick={onQuickAdd}
        aria-label="Быстрое добавление"
      >
        <Icon name="plus" width={18} height={18} />
      </button>

      <IconButton
        icon={<Icon name="more" width={26} height={26} />}
        variant="ghost"
        size="sm"
        onClick={onMoreClick}
        aria-label="Дополнительные действия"
      />
    </div>
  );
}
