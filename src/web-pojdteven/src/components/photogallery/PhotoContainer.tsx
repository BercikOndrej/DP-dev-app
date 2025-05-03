import {useState} from 'react';
import {cn} from '@/lib/utils';

interface Props {
  url: string;
}

export const PhotoContainer = ({url}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const thumbnailsPath = 'static/thumbnails';

  return (<>
    <img
      src={url}
      className={cn(
        'object-cover object-center w-full h-full hover:scale-125 duration-500 transition transform',
        loaded ? 'visible' : 'hidden'
      )}
      onLoad={() => setLoaded(true)}
    />
    <img
      src={`${serverDomain}/${thumbnailsPath}/thumbnail-${url.split('photo-')[1]}`}
      className={cn(
        'object-cover object-center w-full h-full hover:scale-125 duration-500 transition transform',
        loaded ? 'hidden' : 'visible'
      )}
    />
  </>);
}

export default PhotoContainer;