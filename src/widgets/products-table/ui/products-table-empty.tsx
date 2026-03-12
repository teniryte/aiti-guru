import styles from './products-table.module.scss';

export function ProductsTableEmpty() {
  return (
    <div className={styles.state}>
      <div className={styles.stateContent}>
        <p className={styles.stateTitle}>Товары не найдены</p>
        <p className={styles.stateText}>Попробуйте изменить строку поиска или параметры сортировки.</p>
      </div>
    </div>
  );
}
