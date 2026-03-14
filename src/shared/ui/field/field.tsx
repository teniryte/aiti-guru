import clsx from 'clsx';
import styles from './field.module.scss';

type FieldProps = {
  label?: string;
  children?: React.ReactNode;
  size?: 'normal' | 'big';
  className?: string;
};

export function Field({ label, children, size = 'normal', className }: FieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
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
