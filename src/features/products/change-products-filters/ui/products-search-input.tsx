import { SearchInput } from '@/shared/ui/search-input';
import styles from './products-search-input.module.scss';

interface ProductsSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductsSearchInput({ value, onChange }: ProductsSearchInputProps) {
  return (
    <SearchInput
      className={styles.searchInput}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClear={() => onChange('')}
      placeholder="Найти"
    />
  );
}
