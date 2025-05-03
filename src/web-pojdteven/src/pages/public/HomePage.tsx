import ParallaxPhoto from '@/components/ParallaxPhoto';
import ContactPage from './ContactPage';
import SponsorsList from '@/components/sponsors/SponsorsList';

const HomePage = () => {
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
  const posterPath = 'static/FreePlaces.webp';
  return (
    <>
      <ParallaxPhoto className='bg-parallax-home h-[75vh]'>
        <div
          className='flex flex-col gap-8 md:text-2xl font-thin'
          data-aos='fade-up'
        >
          <h1 className='tracking-widest hidden md:block text-6xl font-bold mb-24'>
            Lesní klub Pojďte ven
          </h1>
          <p>Pojďte ven je prostor v lůně přírody u lesa a u vody.</p>
          <p>Udržujeme živý vztah s přírodou a v tomto duchu vedeme i děti.</p>
          <p>
            Svoz a rozvoz – naši průvodci jezdí s dětmi ze zastávky Hlavního
            nádraží v Olomouci.
          </p>
        </div>
      </ParallaxPhoto>
      <div className='items-center justify-items-center p-16 mx-auto'>
        <img
          className='mx-auto'
          src={`${serverDomain}/${posterPath}`}
          alt='Plakát volná místa'
          data-aos='fade-up'
        />
      </div>
      <ParallaxPhoto className='bg-parallax-home-second lg:h-[60vh]'>
        <p className='text-2xl md:text-4xl lg:text-6xl tracking-widest'>
          „Jedině děti vědí, co hledají…“
        </p>
      </ParallaxPhoto>
      <ContactPage />
      <SponsorsList />
    </>
  );
};

export default HomePage;
