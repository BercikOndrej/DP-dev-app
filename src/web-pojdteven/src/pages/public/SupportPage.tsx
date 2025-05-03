import ParallaxPhoto from '@/components/ParallaxPhoto';
import FinancialSupport from '@/components/financialSupport/FinancialSupport';
import TitleText from '@/components/TitleText';
import SponsorsList from '@/components/sponsors/SponsorsList';
import Subtitle from '@/components/Subtitle';
import Section from '@/components/Section';

const SupportPage = () => {
  return (
    <>
      <ParallaxPhoto className='bg-parallax-support scale-100'>
        <h1 className='font-bold tracking-widest text-2xl' data-aos='fade-up'>
          Jak nás můžete podpořit
        </h1>
      </ParallaxPhoto>
      <div className='m-[4vw] max-w-[1140px] xl:mx-auto flex flex-col gap-16'>
        <Section>
          <TitleText>Chci vás podpořit</TitleText>
          <span>Líbí se Vám naše práce?</span>
        </Section>
        <Section className='gap-2'>
          <Subtitle className='font-title text-lg'>
            Můžete se k nám přidat jako dobrovolník
          </Subtitle>
          <ul className='list list-disc list-inside flex flex-col gap-4'>
            <li>
              <span className='font-semibold font-title'>
                &bdquo;Babička v kuchyni&ldquo;
              </span>{' '}
              – Máte čas a chcete jej nějak smysluplně využít? Udělat si výlet
              do krásné přírody a užít si kontakt s dětmi? Jednou týdně nám
              můžete přijet uvařit.
            </li>
            <li>
              <span className='font-semibold font-title'>
                &bdquo;Asistent průvodce&ldquo;
              </span>{' '}
              – Máte svou zavedenou práci a rádi byste dělali ještě něco k tomu,
              co by vás bavilo a naplňovalo? Můžete nám věnovat jeden den svého
              času. I muži jsou vítáni.
            </li>
            <li>
              <span className='font-semibold font-title'>
                &bdquo;IT podpora&ldquo;
              </span>
            </li>
            <li>
              <span className='font-semibold font-title'>
                Správce, zahradník
              </span>
            </li>
          </ul>
        </Section>

        <Section className='gap-2'>
          <Subtitle className='text-lg font-title'>
            Materiální podpora:
          </Subtitle>
          <ul className='list list-disc list-inside flex flex-col gap-4'>
            <li>písek, dřevěné fošny</li>
            <li>nářadí pro děti</li>
            <li>pastelky, papíry, výkresy, nůžky, lepidla</li>
          </ul>
        </Section>
        <FinancialSupport />
      </div>
      <SponsorsList />
    </>
  );
};

export default SupportPage;
