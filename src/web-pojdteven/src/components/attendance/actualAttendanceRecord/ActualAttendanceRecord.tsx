import useAttendanceItemsOfChildInMonth from '@/hooks/attendance/useAttendanceItemsInMonth';
import useChild from '@/hooks/children/useChild';
import useChildStore from '@/stores/ChildStore';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';

import TitleText from '@/components/TitleText';
import { Badge } from '@/components/ui/badge';
import DaysTable from './DaysTable';
import getVisitedAttendanceItems from '@/utils/helpers/getVisitedAttendanceItems';
import { Button } from '@/components/ui/button';
import usePaymentDataStore from '@/stores/PaymentDataStore';
import useQrCodeDrawerStore from '@/stores/QrCodeDrawerStore';
import QrCodeDrawer from '@/components/financialSupport/QrCodeDrawer';
import ExcelFileDownloadButton from './ExcelDataDownloadButton';
import { QrCode } from 'lucide-react';

const ActualAttendanceRecord = () => {
  const childId = useChildStore((store) => store.childId);
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const setPaymentData = usePaymentDataStore((store) => store.setData);
  const setQrCodeDrawerOpen = useQrCodeDrawerStore((store) => store.setOpen);

  const { data: child } = useChild(childId ?? '');

  const { data: attendanceItemsOfChild } = useAttendanceItemsOfChildInMonth({
    childId: childId,
    month: currentMonth.month(),
  });

  const visitedAttendance = getVisitedAttendanceItems(attendanceItemsOfChild);

  const foodTax = import.meta.env.VITE_FOOD_TAX as number;
  const foodSummaryPrice = (visitedAttendance?.length ?? 0) * foodTax;

  if (!childId) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-[1140px] lx:mx-auto'>
      <TitleText className='text-center'>Přehled aktuální docházky</TitleText>
      <div className='flex flex-col gap-8 items-center lg:items-start lg:flex-row-reverse justify-center w-full'>
        <div className='flex-col items-center p-4 lg:basis-1/2'>
          <div className='flex flex-col md:flex-row gap-4 items-center'>
            <h3 className='text-xl font-title'>Aktuální měsíční poplatek: </h3>
            <Badge className='text-lg justify-center p-2 bg-green-leaf'>
              {foodSummaryPrice + (child?.monthlyFee ?? 0)},- Kč
            </Badge>
          </div>
          <ul className='list-disc list-inside  py-4 sm:p-4 lg:p-8 text-slate-500'>
            <li>
              Měsíční školkovné:{' '}
              <span className='font-bold'>{child?.monthlyFee},- Kč</span>
            </li>
            <li>
              Stravné {foodTax},-Kč/den:{' '}
              <span className='font-bold'>{foodSummaryPrice},- Kč</span>
            </li>
          </ul>
          <div className='flex flex-row gap-4 items-center justify-center md:justify-start'>
            <Button
              variant='outline'
              onClick={() => {
                setPaymentData({
                  amount: foodSummaryPrice + (child?.monthlyFee ?? 0),
                  message: 'Měsíční školkovné - ' + child?.fullName,
                });
                setQrCodeDrawerOpen(true);
              }}
            >
              <QrCode />
              Vygenerovat QR kód
            </Button>
            <ExcelFileDownloadButton />
          </div>
        </div>
        <DaysTable />
      </div>
      <QrCodeDrawer />
    </div>
  );
};

export default ActualAttendanceRecord;
