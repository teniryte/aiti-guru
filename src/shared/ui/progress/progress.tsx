import * as RadixProgress from '@radix-ui/react-progress';
import clsx from 'clsx';

import styles from './progress.module.scss';

type ProgressProps = {
  value: number | null;
  max?: number;
  className?: string;
};

export function Progress({ value, max = 100, className }: ProgressProps) {
  const percentage =
    value == null ? undefined : Math.max(0, Math.min(100, (value / max) * 100));
  const transformStyle =
    percentage == null ? undefined : { transform: `translateX(-${100 - percentage}%)` };

  return (
    <RadixProgress.Root
      data-slot="progress-root"
      className={clsx(styles.root, className)}
      value={value ?? undefined}
      max={max}
    >
      <RadixProgress.Indicator
        data-slot="progress-indicator"
        className={styles.indicator}
        style={transformStyle}
      />
    </RadixProgress.Root>
  );
}
