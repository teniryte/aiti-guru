import { useIsFetching } from '@tanstack/react-query';
import { useRouterState } from '@tanstack/react-router';

import { Progress } from '@/shared/ui/progress';

import styles from './app-progress.module.scss';

export function AppProgress() {
  const isFetching = useIsFetching();
  const isRouterBusy = useRouterState({
    select: (state) => state.isLoading || state.isTransitioning,
  });

  const visible = isFetching > 0 || isRouterBusy;

  if (!visible) return null;

  return <Progress value={null} className={styles.appProgress} />;
}
