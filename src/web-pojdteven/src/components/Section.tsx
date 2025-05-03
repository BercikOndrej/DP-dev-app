import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}
const Section = ({ children, className }: Props) => {
  return <div className={cn('flex flex-col gap-8', className)}>{children}</div>;
};

export default Section;
