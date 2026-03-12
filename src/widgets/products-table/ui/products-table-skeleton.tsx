import styles from './products-table.module.scss';

const SKELETON_ROWS = 5;

export function ProductsTableSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <div key={index} className={styles.skeletonRow}>
          <div className={styles.skeletonProduct}>
            <div className={`${styles.skeletonBlock} ${styles.skeletonThumb}`} />
            <div className={styles.skeletonText}>
              <div className={styles.skeletonBlock} />
              <div className={`${styles.skeletonBlock} ${styles.skeletonTextShort}`} />
            </div>
          </div>
          <div className={styles.skeletonBlock} />
          <div className={styles.skeletonBlock} />
          <div className={styles.skeletonBlock} />
          <div className={styles.skeletonBlock} />
          <div className={styles.skeletonBlock} />
        </div>
      ))}
    </div>
  );
}
