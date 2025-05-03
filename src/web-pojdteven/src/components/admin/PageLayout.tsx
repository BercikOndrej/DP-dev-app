import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center gap-16 justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageLayout;
