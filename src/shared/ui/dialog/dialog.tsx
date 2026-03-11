import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { Icon } from '@/shared/assets/icon';
import styles from './dialog.module.scss';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, title, children, footer, className }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay} />

        <DialogPrimitive.Content className={clsx(styles.content, className)}>
          <header className={styles.header}>
            <DialogPrimitive.Title asChild>
              <h2 className={styles.title}>{title}</h2>
            </DialogPrimitive.Title>

            <DialogPrimitive.Close asChild>
              <button type="button" className={styles.closeButton} aria-label="Close dialog">
                <Icon name="close" width={16} height={16} />
              </button>
            </DialogPrimitive.Close>
          </header>

          <div className={styles.body}>{children}</div>

          {footer && <footer className={styles.footer}>{footer}</footer>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}


