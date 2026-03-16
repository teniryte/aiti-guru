import { ApiError } from '@/shared/api/api-error';
import { toast } from '@/shared/lib/toast';

export const SERVER_ERROR_TOAST_MESSAGE =
  'Произошла ошибка сервера, пожалуйста попробуйте позднее';

export const SUPPRESS_SERVER_ERROR_TOAST_META_KEY = 'suppressServerErrorToast';

type ErrorToastMeta = {
  [SUPPRESS_SERVER_ERROR_TOAST_META_KEY]?: boolean;
};

function isErrorToastMeta(value: unknown): value is ErrorToastMeta {
  return typeof value === 'object' && value !== null;
}

export function shouldShowServerErrorToast(error: unknown, meta: unknown): boolean {
  if (!(error instanceof ApiError)) {
    return false;
  }

  if (isErrorToastMeta(meta) && meta[SUPPRESS_SERVER_ERROR_TOAST_META_KEY] === true) {
    return false;
  }

  return true;
}

export function showServerErrorToast() {
  toast.error(SERVER_ERROR_TOAST_MESSAGE);
}

