import { describe, expect, it } from 'vitest';
import { mapLoginError } from './map-login-error';

describe('mapLoginError', () => {
  it('returns error message when Error has non-empty message', () => {
    expect(mapLoginError(new Error('Неверный пароль'))).toBe('Неверный пароль');
  });

  it('returns fallback message for unknown values', () => {
    expect(mapLoginError(null)).toBe('Не удалось выполнить вход');
    expect(mapLoginError({ message: 'x' })).toBe('Не удалось выполнить вход');
  });
});
