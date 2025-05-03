import AdminSidebar from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import '../../index.css';
import useAOS from '@/hooks/useAOS';

const AdminPageLayout = () => {
  useAOS();

  return (
    <SidebarProvider className='w-full'>
      <AdminSidebar />
      <SidebarTrigger className='m-2' />
      <div className='w-full min-h-screen flex flex-col items-center justify-between m-[4vw] p-0 lg:p-4 lg:mx-auto max-w-[1140px]'>
        <main className='w-full h-full'>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminPageLayout;
