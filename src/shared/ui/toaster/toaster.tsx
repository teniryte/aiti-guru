import * as Toast from '@radix-ui/react-toast';
import { AnimatePresence, motion } from 'motion/react';

import { useToastStore } from '@/shared/lib/toast/toast.store';
import { Icon } from '@/shared/assets/icon';

import styles from './toaster.module.scss';

export function Toaster() {
  const items = useToastStore((state) => state.items);
  const remove = useToastStore((state) => state.remove);

  return (
    <Toast.Provider duration={3000} swipeDirection="right">
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <Toast.Root
            key={item.id}
            asChild
            open
            onOpenChange={(open) => {
              if (!open) remove(item.id);
            }}
            duration={item.duration}
          >
            <motion.div
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`${styles.toast} ${styles[item.variant]}`}
            >
              <div className={styles.body}>
                <span className={styles.icon}>
                  {item.variant === 'success' && <Icon name="check" width={16} height={16} />}
                  {item.variant === 'error' && <Icon name="alert" width={16} height={16} />}
                  {item.variant === 'info' && <Icon name="info" width={16} height={16} />}
                </span>

                <div className={styles.content}>
                  {item.title ? <Toast.Title className={styles.title}>{item.title}</Toast.Title> : null}
                  <Toast.Description className={styles.description}>
                    {item.description}
                  </Toast.Description>
                </div>
              </div>

              <Toast.Close aria-label="Закрыть" className={styles.closeButton}>
                <Icon name="close" width={14} height={14} />
              </Toast.Close>
            </motion.div>
          </Toast.Root>
        ))}
      </AnimatePresence>

      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
}
