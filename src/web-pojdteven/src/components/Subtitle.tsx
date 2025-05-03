import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}
const Subtitle = ({ children, className }: Props) => {
  return <h3 className={cn('font-semibold mb-2', className)}>{children}</h3>;
};

export default Subtitle;
