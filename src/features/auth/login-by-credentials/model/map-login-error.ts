const FALLBACK_MESSAGE = 'Не удалось выполнить вход';

function isAxiosError(
  error: unknown,
): error is { response?: { data?: { message?: string } }; message?: string } {
  return typeof error === 'object' && error !== null && 'response' in error;
}

export function mapLoginError(error: unknown): string {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string' && message.length > 0) {
      return message;
    }
    if (typeof error.message === 'string' && error.message.length > 0) {
      return error.message;
    }
  }
  return FALLBACK_MESSAGE;
}
