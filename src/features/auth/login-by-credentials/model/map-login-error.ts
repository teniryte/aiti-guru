const FALLBACK_MESSAGE = 'Не удалось выполнить вход';

export function mapLoginError(error: unknown): string {
  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return FALLBACK_MESSAGE;
}
