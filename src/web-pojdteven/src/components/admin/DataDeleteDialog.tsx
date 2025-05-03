import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

interface Props {
  onDelete: () => void;
}
const DataDeleteDialog = ({ onDelete }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className='p-2 items-center rounded-lg bg-red-500 hover:bg-red-500/80 dark:bg-red-500 dark:hover:bg-red-500/80 w-max'>
          <Trash2 className='text-white dark:text-white' />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Smazání dat</DialogTitle>
          <DialogDescription>
            Tato akce je nevratná. Opravdu chcete objekt smazat?
          </DialogDescription>
        </DialogHeader>
        <div className='w-full mt-8 flex flex-row gap-4 lg:gap-8 justify-items-stretch items-center'>
          <Button
            variant='destructive'
            className='flex-1'
            onClick={() => onDelete()}
          >
            Smazat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataDeleteDialog;
