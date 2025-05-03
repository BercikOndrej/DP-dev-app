import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import useQrCodeDrawerStore from '@/stores/QrCodeDrawerStore';
import usePaymentDataStore from '@/stores/PaymentDataStore';
import useQrCode from '@/hooks/useQrCode';
import BankInformations from './BankInformations';

const QrCodeDrawer = () => {
  const { open, setOpen } = useQrCodeDrawerStore();
  const { data } = usePaymentDataStore();
  const { data: qrCode } = useQrCode(data);

  return (
    <Drawer open={open}>
      <DrawerContent className='mx-auto'>
        <DrawerHeader className='mx-auto flex flex-col justify-center text-center'>
          <DrawerTitle className='text-center'>
            Platba pomocí QR kódu
          </DrawerTitle>
          <DrawerDescription>
            Platbu nemusíte zaplatit jen pomocí QR kódu ale můžete využít i
            plabu přes bankovní účet.
          </DrawerDescription>
        </DrawerHeader>
        <img src={qrCode ?? ''} className='w-64 h-64 mx-auto' />
        <BankInformations className='my-0 mb-0 gap-4' />
        <DrawerFooter>
          <Button
            className='w-max mx-auto'
            variant='secondary'
            onClick={() => {
              setOpen(false);
            }}
          >
            Zpět
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default QrCodeDrawer;
