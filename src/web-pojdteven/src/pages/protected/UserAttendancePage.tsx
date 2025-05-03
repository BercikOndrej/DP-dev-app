import UserCalendar from '@/components/attendance/calendar/user/UserCalendar';
import ChildSelect from '@/components/attendance/ChildSelect';
import ActualAttendanceRecord from '@/components/attendance/actualAttendanceRecord/ActualAttendanceRecord';
import TitleText from '@/components/TitleText';
import useCurrentUserChildren from '@/hooks/children/useUserChildren';
import useChildStore from '@/stores/ChildStore';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';

const UserAttendancePage = () => {
  const { data: children, isLoading } = useCurrentUserChildren();
  const setChildId = useChildStore((store) => store.setChildId);

  useEffect(() => {
    if (children?.length === 1) {
      setChildId(children[0].id!);
    }
  }, [children, setChildId]);

  if (isLoading) {
    return <Spinner size='large' className='m-auto mt-16' />;
  }

  if (children?.length === 0 || !children) {
    return (
      <div className='flex justify-center items-center text-2xl'>
        Pro přihlášeného uživatele nebylo nalezeno žádné dítě.
      </div>
    );
  }

  if (children.length === 1) {
    return (
      <div className='flex flex-col gap-8 m-[4vw] justify-center items-center'>
        <TitleText>Docházka</TitleText>
        <span className='text-xl'>{children[0].fullName}</span>
        <UserCalendar />
        <ActualAttendanceRecord />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-16 xl:mx-auto justify-center items-center'>
      <TitleText>Docházka</TitleText>
      {children.length === 1 ? (
        <span className='text-xl'>{children[0].fullName}</span>
      ) : (
        <ChildSelect />
      )}
      <UserCalendar />
      <ActualAttendanceRecord />
    </div>
  );
};

export default UserAttendancePage;
