import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
}

const ParallaxPhoto = ({ children, className }: Props) => {
  const generalStyle =
    'flex relative items-center justify-center h-96 bg-scroll bg-center md:bg-fixed bg-cover drop-shadow-lg bg-no-repeat';
  return (
    <div className={cn(generalStyle, className)}>
      <div className='absolute text-center transform translate-x-[-50%] fit translate-y-[-50%] left-1/2 top-1/2 text-white flex flex-row gap-4'>
        {children}
      </div>
    </div>
  );
};

export default ParallaxPhoto;
