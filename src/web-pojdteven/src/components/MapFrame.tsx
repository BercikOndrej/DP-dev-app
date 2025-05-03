import { EMBEDED_MAP_FRAME } from '@/utils/constants';

const MapFrame = () => {
  return (
    <map className='w-full' name='Olomouc - Lošov 99'>
      <iframe
        title={'Mapa zobrazující adresu školky'}
        src={EMBEDED_MAP_FRAME}
        data-aos='fade-up'
        allowFullScreen={false}
        className='h-[400px] xl:h-[600px]'
        width='100%'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
    </map>
  );
};

export default MapFrame;
