import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Input } from '../input';
import { Icon } from '../../assets/icon';
import styles from './search-input.module.scss';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  isClearable?: boolean;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ placeholder = 'Найти', isClearable = true, className, ...rest }, ref) {
    return (
      <div className={clsx(styles.searchInputWrapper, className)}>
        <Input
          ref={ref}
          type="text"
          icon={<Icon name="search" width={18} height={18} />}
          isClearable={isClearable}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  },
);
