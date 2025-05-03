import { create } from 'zustand';

interface PaymentData {
  amount: number;
  message?: string;
}

interface PaymentDataStore {
  data: PaymentData | undefined;
  setData: (value: PaymentData | undefined) => void;
}

const usePaymentDataStore = create<PaymentDataStore>((set) => ({
  data: undefined,
  setData: (value: PaymentData | undefined) => set(() => ({ data: value })),
}));

export default usePaymentDataStore;
