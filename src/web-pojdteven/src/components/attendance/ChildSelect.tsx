import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import useChildStore from '@/stores/ChildStore';
import useCurrentUserChildren from '@/hooks/children/useUserChildren';

const ChildSelect = () => {
  const { childId, setChildId } = useChildStore();
  const { data: userChildren } = useCurrentUserChildren();
  const actualChildName = userChildren?.find(
    (child) => childId === child.id
  )?.fullName;

  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
      <div>Spravovat docházku pro: </div>
      <Select onValueChange={(value) => setChildId(value)}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder={actualChildName ?? 'Dítě...'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectContent>
              <SelectLabel>Děti</SelectLabel>
              {userChildren?.map((child) => (
                <SelectItem key={child.id} value={child.id!}>
                  {child.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChildSelect;
