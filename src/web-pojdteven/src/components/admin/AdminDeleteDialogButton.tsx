import { Role } from '@/enums';
import useAuthStore from '@/stores/AuthStore';
import { useLocation } from 'react-router-dom';
import DataDeleteDialog from './DataDeleteDialog';

interface Props {
  conditionalPath: string;
  onDelete: () => void;
}

const AdminDeleteDialogButton = ({ conditionalPath, onDelete }: Props) => {
  const user = useAuthStore((store) => store.user);
  const location = useLocation();
  const adminCondition =
    user?.role === Role.ADMIN && location.pathname == conditionalPath;

  if (!adminCondition) return null;

  return (
    <div className='absolute flex md:hidden group-hover:flex top-4 right-4 z-50'>
      <DataDeleteDialog onDelete={onDelete} />
    </div>
  );
};

export default AdminDeleteDialogButton;
