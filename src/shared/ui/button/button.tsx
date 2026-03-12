import React from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

type ButtonSize = 'normal' | 'big';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isBlock?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
}

export function Button({
  children,
  icon,
  isBlock = false,
  isLoading = false,
  size = 'normal',
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles[size]]: true,
          [styles.block]: isBlock,
          [styles.loading]: isLoading,
        },
        className,
      )}
      disabled={disabled ?? isLoading}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && (
        <span className={styles.label}>
          {children}
          {isLoading && '...'}
        </span>
      )}
    </button>
  );
}
