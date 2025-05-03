import PageLayout from '@/components/admin/PageLayout';
import TeacherCalendar from '@/components/attendance/calendar/teacher/TeacherCalendar';
import TitleText from '@/components/TitleText';
import { Skeleton } from '@/components/ui/skeleton';
import useUser from '@/hooks/users/useUser';
import useTeacherStore from '@/stores/TeacherStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TeacherAttendanceDetailPage = () => {
  const setTeacherId = useTeacherStore((store) => store.setTeacherId);
  const params = useParams();
  const { data: teacher, isLoading } = useUser(params.id ?? '');

  useEffect(() => setTeacherId(params.id ?? ''), [params.id]);

  return (
    <PageLayout>
      {isLoading ? (
        <Skeleton className='w-1/2 h-8 mx-auto' />
      ) : (
        <TitleText>Docházka - {teacher?.fullName}</TitleText>
      )}
      <TeacherCalendar />
    </PageLayout>
  );
};

export default TeacherAttendanceDetailPage;
