import { describe, expect, it } from 'vitest';
import { ApiError } from '@/shared/api/api-error';
import { mapLoginError } from './map-login-error';

describe('mapLoginError', () => {
  it('maps invalid credentials ApiError to UI auth message', () => {
    expect(mapLoginError(new ApiError('Invalid credentials', 400))).toBe('Неверный логин или пароль');
  });

  it('returns null for server errors that should be handled by toast', () => {
    expect(mapLoginError(new ApiError('Internal server error', 500))).toBeNull();
  });

  it('returns null for unknown values', () => {
    expect(mapLoginError(null)).toBeNull();
    expect(mapLoginError(new Error('x'))).toBeNull();
  });
});
