import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUser from '@/hooks/users/useUser';
import useAuthStore from '@/stores/AuthStore';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';
import { Role } from '@/enums';

const AccountDropddownMenu = () => {
  const { user: currentUser, logout } = useAuthStore.getState();
  const { data: user, isLoading } = useUser(currentUser?.id);

  if (isLoading) {
    return (
      <Skeleton className=' w-40 h-9 rounded-xl items-center justify-center' />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='inline-flex justify-center gap-2 items-center p-2 sm:p-4 h-9 rounded-xl border border-slate-200 shadow-sm hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 hover:bg-slate-100 text-sm font-medium hover:dark:bg-slate-800 dark:hover:bg-slate-800 [&_svg]:size-4 [&_svg]:shrink-0 dark:hover:text-slate-50 ease-linear duration-500'>
        <FaUser />
        <div className='hidden sm:block'>{user?.fullName}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Můj účet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to='/clenska-sekce' className='w-full h-full'>
            Správa účtu
          </Link>
        </DropdownMenuItem>
        {user?.role === Role.ADMIN && (
          <DropdownMenuItem>
            <Link to='/admin' className='w-full h-full'>
              Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link
            onClick={() => {
              logout();
            }}
            to='/'
            className='w-full h-full'
          >
            Odhlásit se
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropddownMenu;
