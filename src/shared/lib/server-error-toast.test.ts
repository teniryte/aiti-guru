import { describe, expect, it } from 'vitest';
import { ApiError } from '@/shared/api/api-error';
import {
  shouldShowServerErrorToast,
  SUPPRESS_SERVER_ERROR_TOAST_META_KEY,
} from './server-error-toast';

describe('shouldShowServerErrorToast', () => {
  it('returns true for ApiError by default', () => {
    const error = new ApiError('boom', 500);

    expect(shouldShowServerErrorToast(error, undefined)).toBe(true);
  });

  it('returns false when suppression meta is enabled', () => {
    const error = new ApiError('invalid', 400);

    expect(
      shouldShowServerErrorToast(error, {
        [SUPPRESS_SERVER_ERROR_TOAST_META_KEY]: true,
      }),
    ).toBe(false);
  });

  it('returns false for non ApiError values', () => {
    expect(shouldShowServerErrorToast(new Error('x'), undefined)).toBe(false);
  });
});
