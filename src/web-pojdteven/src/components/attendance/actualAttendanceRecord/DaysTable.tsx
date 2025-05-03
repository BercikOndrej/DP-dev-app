import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useAttendanceItemsOfChildInMonth from '@/hooks/attendance/useAttendanceItemsInMonth';
import useChildStore from '@/stores/ChildStore';
import useCurrentMonthStore from '@/stores/CurrentMonthStore';
import getVisitedAttendanceItems from '@/utils/helpers/getVisitedAttendanceItems';
import dayjs from 'dayjs';
import { useState } from 'react';
import { MdOutlineExpandLess } from 'react-icons/md';
import { MdOutlineExpandMore } from 'react-icons/md';

const DISPLAY_DAYS_COUNT = 5;
const ICON_SIZE = 30;
const ICON_HOVER_STYLE =
  'hover:text-green-leaf hover:scale-125 duration-500 ease-linear';

const DaysTable = () => {
  const currentMonth = useCurrentMonthStore((store) => store.currentMonth);
  const [open, setOpen] = useState(false);
  const childId = useChildStore((store) => store.childId);

  const { data: attendanceItemsOfChild } = useAttendanceItemsOfChildInMonth({
    childId: childId,
    month: currentMonth.month(),
  });

  const visitedAttendance = getVisitedAttendanceItems(attendanceItemsOfChild);

  return (
    <div className='flex flex-row lg:basis-1/2 w-full'>
      <div className='w-full p-4 flex-col'>
        <Table className='w-2/3 m-auto lg:ml-auto'>
          <TableCaption>{currentMonth.format('MMMM YYYY')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitedAttendance?.slice(0, DISPLAY_DAYS_COUNT).map((att) => (
              <TableRow key={att.id}>
                <TableCell>{dayjs(att.date).format('D. M')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {(visitedAttendance?.length ?? 0) > DISPLAY_DAYS_COUNT && (
          <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='w-2/3 m-auto lg:ml-auto'
          >
            <CollapsibleTrigger className='w-full flex flex-row justify-center'>
              {open ? (
                <MdOutlineExpandLess
                  className={ICON_HOVER_STYLE}
                  size={ICON_SIZE}
                />
              ) : (
                <MdOutlineExpandMore
                  className={ICON_HOVER_STYLE}
                  size={ICON_SIZE}
                />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableBody>
                  {visitedAttendance?.slice(DISPLAY_DAYS_COUNT).map((att) => (
                    <TableRow key={att.id}>
                      <TableCell>{dayjs(att.date).format('D. M')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  );
};

export default DaysTable;
