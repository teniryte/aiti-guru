import { create } from 'zustand';

type VendorOptionsStore = {
  options: string[];
  addOption: (option: string) => void;
};

function normalizeVendor(value: string) {
  return value.trim();
}

export const useVendorOptionsStore = create<VendorOptionsStore>((set) => ({
  options: ['Microsoft', 'Apple', 'NVidia'],
  addOption: (option) =>
    set((state) => {
      const normalized = normalizeVendor(option);

      if (!normalized) return state;
      if (state.options.some((item) => item.toLowerCase() === normalized.toLowerCase())) {
        return state;
      }

      return {
        options: [...state.options, normalized].sort((a, b) => a.localeCompare(b)),
      };
    }),
}));
