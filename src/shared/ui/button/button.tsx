import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonSize = 'normal' | 'big';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isBlock?: boolean;
  size?: ButtonSize;
}

export function Button({
  children,
  icon,
  isBlock = false,
  size = 'normal',
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        {
          [size]: true,
          block: isBlock,
        },
        className,
      )}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.label}>{children}</span>}
    </button>
  );
}
