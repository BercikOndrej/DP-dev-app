import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
}
const FormCard = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-3xl p-4 md:p-8 w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormCard;
