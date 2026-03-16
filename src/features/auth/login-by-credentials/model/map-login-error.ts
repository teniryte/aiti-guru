import { ApiError } from '@/shared/api/api-error';

const INVALID_CREDENTIALS_MESSAGE = 'Invalid credentials';
const UI_INVALID_CREDENTIALS_MESSAGE = 'Неверный логин или пароль';

export function mapLoginError(error: unknown): string | null {
  if (!(error instanceof ApiError)) {
    return null;
  }

  if (error.message === INVALID_CREDENTIALS_MESSAGE) {
    return UI_INVALID_CREDENTIALS_MESSAGE;
  }

  return null;
}
