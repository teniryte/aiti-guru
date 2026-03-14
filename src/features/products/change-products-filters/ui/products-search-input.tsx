import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { Icon } from '@/shared/assets/icon';
import { Input } from '@/shared/ui/input';
import { useProductsFilters } from '../model/use-products-filters';
import styles from './products-search-input.module.scss';

interface ProductsSearchInputProps {
  className?: string;
}

export function ProductsSearchInput({ className }: ProductsSearchInputProps) {
  const { filters, setSearch } = useProductsFilters();
  const [value, setValue] = useState(filters.search);

  const getSearchQuery = (nextValue: string) => (nextValue.length > 1 ? nextValue : '');

  const debouncedSetSearch = useMemo(() => debounce(setSearch, 300), [setSearch]);

  useEffect(() => () => debouncedSetSearch.cancel(), [debouncedSetSearch]);

  return (
    <Input
      className={[styles.searchInput, className].filter(Boolean).join(' ')}
      value={value}
      onChange={(event) => {
        const nextValue = event.target.value;
        setValue(nextValue);
        debouncedSetSearch(getSearchQuery(nextValue));
      }}
      onClear={() => {
        debouncedSetSearch.cancel();
        setValue('');
        setSearch('');
      }}
      icon={<Icon name="search" width={20} height={20} />}
      isClearable
      size="big"
      placeholder="Найти"
    />
  );
}
