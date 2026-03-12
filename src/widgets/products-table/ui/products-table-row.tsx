import clsx from 'clsx';
import {
  ProductNameCell,
  ProductRowActions,
  type Product,
} from '@/entities/product';
import { Checkbox } from '@/shared/ui/checkbox';
import styles from './products-table.module.scss';

interface ProductsTableRowProps {
  product: Product;
  selected: boolean;
  onSelect: (id: number, value: boolean) => void;
}

function formatPrice(price: number) {
  const [integerPart, decimalPart = '00'] = price.toFixed(2).split('.');

  return {
    integer: Number(integerPart).toLocaleString('ru-RU'),
    decimal: decimalPart,
  };
}

function renderRating(rating: number | null) {
  if (rating == null) {
    return <span className={styles.ratingValue}>-</span>;
  }

  return (
    <span className={styles.ratingValue}>
      <span className={rating < 4 ? styles.ratingLow : undefined}>{rating.toFixed(1)}</span>
      <span className={styles.ratingScale}>/5</span>
    </span>
  );
}

export function ProductsTableRow({
  product,
  selected,
  onSelect,
}: ProductsTableRowProps) {
  const formattedPrice = formatPrice(product.price);

  return (
    <div className={clsx(styles.row, selected && styles.selected)}>
      <div className={styles.productHead}>
        <div className={styles.checkboxCell}>
          <Checkbox value={selected} onChange={(value) => onSelect(product.id, value)} />
        </div>
        <ProductNameCell name={product.name} category={product.category} />
      </div>

      <span className={styles.textCell}>{product.vendor ?? '-'}</span>
      <span className={clsx(styles.textCell, styles.subtleCell)}>{product.article ?? '-'}</span>

      <div className={styles.centeredCell}>{renderRating(product.rating)}</div>

      <div className={styles.centeredCell}>
        <span className={styles.priceValue}>
          <span className={styles.priceInteger}>{formattedPrice.integer}</span>
          <span className={styles.priceDecimal}>,{formattedPrice.decimal}</span>
        </span>
      </div>

      <div className={styles.centeredCell}>
        <ProductRowActions />
      </div>
    </div>
  );
}
