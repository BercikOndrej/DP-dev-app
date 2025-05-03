import ContactInfo from '@/components/ContactInfo';
import MapFrame from '@/components/MapFrame';

const ContactPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className=' grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2'>
        <ContactInfo />
        <div
          className='bg-parallax-gallery bg-center bg-cover'
          data-aos='fade-left'
        />
      </div>
      <MapFrame />
    </div>
  );
};

export default ContactPage;
