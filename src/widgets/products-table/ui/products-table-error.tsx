import styles from './products-table.module.scss';

interface ProductsTableErrorProps {
  onRetry?: () => void;
}

export function ProductsTableError({ onRetry }: ProductsTableErrorProps) {
  return (
    <div className={styles.state}>
      <div className={styles.stateContent}>
        <p className={styles.stateTitle}>Не удалось загрузить товары</p>
        <p className={styles.stateText}>Обновите список или попробуйте еще раз чуть позже.</p>
        {onRetry && (
          <button type="button" className={styles.stateAction} onClick={onRetry}>
            Повторить
          </button>
        )}
      </div>
    </div>
  );
}
