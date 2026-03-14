import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './button';

afterEach(() => cleanup());

describe('Button integration (RTL)', () => {
  it('renders label and loading suffix when isLoading=true', () => {
    const { container } = render(<Button isLoading>Сохранить</Button>);

    expect(screen.getByText('Сохранить...')).not.toBeNull();
    expect(container.innerHTML).toContain('disabled=""');
  });

  it('keeps button enabled when not loading', () => {
    const { container } = render(<Button>Отправить</Button>);

    expect(screen.getByText('Отправить')).not.toBeNull();
    expect(container.innerHTML).not.toContain('disabled=""');
  });
});
