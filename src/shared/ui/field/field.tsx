import clsx from 'clsx';
import styles from './field.module.scss';

type FieldProps = {
  label?: string;
  children?: React.ReactNode;
  size?: 'normal' | 'big';
};

export function Field({ label, children, size = 'normal' }: FieldProps) {
  return (
    <div className={styles.field}>
      {label && (
        <span
          className={clsx(styles.label, {
            [styles[size]]: true,
          })}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
