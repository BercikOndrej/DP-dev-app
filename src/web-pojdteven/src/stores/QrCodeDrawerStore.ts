import { create } from 'zustand';

interface QrCodeDrawerStore {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const useQrCodeDrawerStore = create<QrCodeDrawerStore>((set) => ({
  open: false,
  setOpen: (value: boolean) => set(() => ({ open: value })),
}));

export default useQrCodeDrawerStore;
