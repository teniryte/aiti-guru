import { useRef } from 'react';
import clsx from 'clsx';
import { Icon } from '@/shared/assets/icon';
import styles from './search-input.module.scss';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value = '',
  onChange,
  placeholder = 'Найти',
  className,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = Boolean(value);

  return (
    <div className={clsx(styles.searchInput, className)}>
      <Icon
        name="search"
        className={styles.searchIcon}
        width="24"
        height="24"
        aria-hidden="true"
      />

      <input
        ref={inputRef}
        type="text"
        className={styles.searchField}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />

      {hasValue && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => {
            onChange?.('');
            inputRef.current?.focus();
          }}
          aria-label="Очистить"
        >
          <Icon name="close" width="16" height="16" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
