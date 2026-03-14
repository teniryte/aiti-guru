import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { ProductsTableEmpty } from './products-table-empty';
import { ProductsTableError } from './products-table-error';

afterEach(() => cleanup());

describe('Products table states integration (RTL)', () => {
  it('renders empty state texts', () => {
    render(<ProductsTableEmpty />);

    expect(screen.getByText('Товары не найдены')).not.toBeNull();
    expect(screen.getByText('Попробуйте изменить строку поиска или параметры сортировки.')).not.toBeNull();
  });

  it('renders error state with retry button when callback is provided', () => {
    render(<ProductsTableError onRetry={() => undefined} />);

    expect(screen.getByText('Не удалось загрузить товары')).not.toBeNull();
    expect(screen.getByText('Повторить')).not.toBeNull();
  });

  it('renders error state without retry button when callback is omitted', () => {
    render(<ProductsTableError />);

    expect(screen.getByText('Не удалось загрузить товары')).not.toBeNull();
    expect(screen.queryByText('Повторить')).toBeNull();
  });
});
