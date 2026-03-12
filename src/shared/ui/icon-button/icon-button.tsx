import React from 'react';
import clsx from 'clsx';
import { Spinner } from '@/shared/ui/spinner';
import styles from './icon-button.module.scss';

type IconButtonVariant = 'outlined' | 'ghost';
type IconButtonSize = 'sm' | 'md';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  isLoading?: boolean;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

export function IconButton({
  icon,
  isLoading = false,
  variant = 'outlined',
  size = 'md',
  className,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={clsx(styles.iconButton, styles[variant], styles[size], className)}
      disabled={disabled ?? isLoading}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : icon}
    </button>
  );
}
