import BankInformations from '@/components/financialSupport/BankInformations';
import ParallaxPhoto from '@/components/ParallaxPhoto';
import PrivateTeachersList from '@/components/privateTeachers/PrivateTeachersList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuthStore from '@/stores/AuthStore';
import { Role } from '@/enums';
import TeacherAttendancePage from './TeacherAttendancePage';
import UserPage from './UserPage';
import UserAttendancePage from './UserAttendancePage';

const MembersSectionPage = () => {
  const user = useAuthStore((store) => store.user);
  return (
    <>
      <ParallaxPhoto className='bg-parallax-membership'>
        <div className='flex flex-col gap-8 ' data-aos='fade-up'>
          <h1 className='font-bold tracking-widest text-6xl'>Členská sekce</h1>
        </div>
      </ParallaxPhoto>
      <div className='w-full'>
        <Tabs defaultValue='account'>
          <TabsList>
            <TabsTrigger value='account'>Můj účet</TabsTrigger>
            <TabsTrigger value='attendance'>Docházka</TabsTrigger>
            {user?.role === Role.USER && (
              <TabsTrigger value='contacts'>Kontakty</TabsTrigger>
            )}
          </TabsList>
          <div className='max-w-[1140px] m-[4vw] xl:mx-auto'>
            <TabsContent value='account'>
              <UserPage />
            </TabsContent>
          </div>
          <div className='m-[4vw]'>
            <TabsContent value='attendance'>
              {user?.role === Role.USER ? (
                <UserAttendancePage />
              ) : (
                <TeacherAttendancePage />
              )}
            </TabsContent>
          </div>
          <TabsContent value='contacts'>
            <PrivateTeachersList />
            <BankInformations />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MembersSectionPage;
