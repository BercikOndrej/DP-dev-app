import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const TitleText = ({ children, className }: Props) => {
  return (
    <h2 className={cn('text-2xl md:text-4xl font-title', className)}>
      {children}
    </h2>
  );
};

export default TitleText;
