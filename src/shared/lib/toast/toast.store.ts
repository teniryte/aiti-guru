import { create } from 'zustand';

export type ToastVariant = 'success' | 'error' | 'info';

export type ToastItem = {
  id: string;
  title?: string;
  description: string;
  variant: ToastVariant;
  duration?: number;
};

type ToastStore = {
  items: ToastItem[];
  push: (toast: Omit<ToastItem, 'id'>) => string;
  remove: (id: string) => void;
  clear: () => void;
};

function createToastId() {
  return crypto.randomUUID();
}

export const useToastStore = create<ToastStore>((set) => ({
  items: [],
  push: (toast) => {
    const id = createToastId();

    set((state) => ({
      items: [...state.items, { id, ...toast }],
    }));

    return id;
  },
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clear: () => set({ items: [] }),
}));

