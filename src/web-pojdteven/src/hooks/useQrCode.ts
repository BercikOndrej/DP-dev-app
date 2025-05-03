import { useQuery } from '@tanstack/react-query';
import { paymentControllerGeneratePaymentQrOptions } from '../client/@tanstack/react-query.gen';

const useQrCode = (
  paymentData: { amount: number; message?: string } | undefined
) =>
  useQuery({
    ...paymentControllerGeneratePaymentQrOptions({
      query: {
        amount: paymentData?.amount,
        message: paymentData?.message,
      },
    }),
    enabled: !!paymentData,
  });

export default useQrCode;
