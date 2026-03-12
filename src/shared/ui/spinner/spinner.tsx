import clsx from 'clsx';
import styles from './spinner.module.scss';

type SpinnerSize = 'sm' | 'md';

type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span
      className={clsx(styles.spinner, styles[size], className)}
      aria-hidden="true"
    />
  );
}
