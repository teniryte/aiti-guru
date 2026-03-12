import { create } from 'zustand';

type AddProductStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDialog: () => void;
  closeDialog: () => void;
};

export const useAddProductStore = create<AddProductStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openDialog: () => set({ open: true }),
  closeDialog: () => set({ open: false }),
}));
