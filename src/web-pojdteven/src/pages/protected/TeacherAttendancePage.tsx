import TeacherCalendar from '@/components/attendance/calendar/teacher/TeacherCalendar';
import TitleText from '@/components/TitleText';

const TeacherAttendancePage = () => {
  return (
    <div className='flex flex-col gap-8 m-[4vw] justify-center items-center'>
      <TitleText>Docházka</TitleText>
      <TeacherCalendar />
    </div>
  );
};

export default TeacherAttendancePage;
