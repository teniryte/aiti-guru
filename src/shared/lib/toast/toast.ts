import { useToastStore } from './toast.store';

type ShowToastParams = {
  title?: string;
  description: string;
  duration?: number;
};

export const toast = {
  success(params: string | ShowToastParams) {
    useToastStore.getState().push(
      typeof params === 'string'
        ? { description: params, variant: 'success' }
        : { ...params, variant: 'success' },
    );
  },

  error(params: string | ShowToastParams) {
    useToastStore.getState().push(
      typeof params === 'string'
        ? { description: params, variant: 'error' }
        : { ...params, variant: 'error' },
    );
  },

  info(params: string | ShowToastParams) {
    useToastStore.getState().push(
      typeof params === 'string'
        ? { description: params, variant: 'info' }
        : { ...params, variant: 'info' },
    );
  },

  dismiss(id: string) {
    useToastStore.getState().remove(id);
  },

  clear() {
    useToastStore.getState().clear();
  },
};

