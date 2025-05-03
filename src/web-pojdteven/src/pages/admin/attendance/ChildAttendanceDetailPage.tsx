import CreateChildAttendanceForm from '@/components/admin/CreateChildAttendanceForm';
import PageLayout from '@/components/admin/PageLayout';
import ActualAttendanceRecord from '@/components/attendance/actualAttendanceRecord/ActualAttendanceRecord';
import UserCalendar from '@/components/attendance/calendar/user/UserCalendar';
import TitleText from '@/components/TitleText';
import useChild from '@/hooks/children/useChild';
import useChildStore from '@/stores/ChildStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChildAttendanceDetailPage = () => {
  const { setChildId } = useChildStore();
  const params = useParams();
  const { data: child } = useChild(params.id ?? '');

  useEffect(() => setChildId(params.id ?? ''), [params.id]);

  return (
    <PageLayout>
      <TitleText>Docházka - {child?.fullName}</TitleText>
      <CreateChildAttendanceForm />
      <UserCalendar />
      <ActualAttendanceRecord />
    </PageLayout>
  );
};

export default ChildAttendanceDetailPage;
