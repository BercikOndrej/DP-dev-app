import ContactCard from '@/components/contactCard/ContactCard';
import ContactCardSkeleton from '@/components/contactCard/ContactCardSkeleton';
import DocumentsList from '@/components/documents/DocumentsList';
import GeneralInfoCards from '@/components/GeneralInfoCards';
import ParallaxPhoto from '@/components/ParallaxPhoto';
import Section from '@/components/Section';
import TitleText from '@/components/TitleText';
import { PageType } from '@/enums';
import useContactInfo from '@/hooks/contactInfo/useContactInfo.ts';


const AdaptationProgramPage = () => {
  const { data: contactInfo, isLoading } = useContactInfo(1);

  return (
    <>
      <ParallaxPhoto className='bg-parallax-adaptationProgram'>
        <div className='flex flex-col gap-8' data-aos='fade-up'>
          <p className='font-thin text-2xl'>Adaptační</p>
          <h1 className='font-bold tracking-widest text-6xl'>Program</h1>
        </div>
      </ParallaxPhoto>
      {/* Grid container */}
      <div className='flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-0'>
        <div className='flex flex-col gap-4 mt-8 p-4 md:p-8 col-span-4'>
          {isLoading ? (
            <ContactCardSkeleton />
          ) : (
            <ContactCard person={contactInfo} />
          )}
          <GeneralInfoCards pageType={PageType.ADAPTATION_PROGRAM} />
        </div>
        <div className='col-span-8 flex flex-col gap-16 p-4 md:p-12'>
          <Section>
            <TitleText>Adaptační program</TitleText>
            <div className='flex flex-col gap-8'>
              <p>
                Adapťáček je program pro rodiče s dětmi, který probíhá v
                prostoru Lesního dětského klubu. Děti mohou zažít, jaké to je
                být v lesní „školce“, seznámit se s prostředím a některými
                činnostmi Lesního dětského klubu za doprovodu maminky nebo
                tatínka. Bude-li zájem, ve 2. pololetí (od března) bude probíhat
                dopolední program pro samotné děti od 2 let. Děti se zde mohou
                připravit na dobrý nástup do Lesního dětského klubu.
              </p>
            </div>
          </Section>
          <Section>
            <TitleText>Co nabízíme?</TitleText>
            <div className='flex flex-col gap-4'>
              <p>
                Pobyt a hraní venku a pozorování přírody v průběhu roku. Program
                vychází z běžného rytmu Lesního dětského klubu – zahájení s
                písničkami a básničkami, krátká výprava do okolí, zkoumání,
                objevování a jednoduché tvoření. Zkušenou průvodkyni, která ví,
                o čem je život v lesní „školce“. Malou skupinu a individuální
                přístup.
              </p>
            </div>
          </Section>
          <Section>
            <TitleText>Co potřebujeme?</TitleText>
            <div className='flex flex-col gap-4'>
              <p>Dobrou náladu!</p>
              <p>
                Vhodné oblečení na pobyt venku (doporučujeme se podívat na
                předpověď počasí) i pro rodiče. Ideálně s sebou náhradní
                oblečení, gumáčky a pláštěnku. V případě hodně mokrého či
                studeného počasí můžeme využít týpí a ohřát se u ohýnku.
              </p>
              <p>
                Samostatné děti přijímáme nejdříve od března). Dobré oblečení a boty
                (doporučujeme se podívat na předpověď počasí) a s sebou v
                označené tašce vždy gumáčky, pláštěnku, náhradní oblečení. Děti
                nenutíme být venku v hodně mokrém či studeném počasí, ale je
                třeba počítat s tím, že většinu dopoledne venku budou, pokud to
                bude možné a vhodné oblečení jim v tom může hodně pomoci.
              </p>
              <p>
                Paralelně probíhá také program Lesního dětského klubu, prosíme o
                následování instrukcí průvodkyně ohledně místa srazu, abychom si
                nezasahovali vzájemně do aktivit.
              </p>
            </div>
          </Section>
          <Section>
            <TitleText>Přihlášení</TitleText>
            <div className='flex flex-col gap-4'>
              <p>
                Pro rezervaci míst pište <strong>Aleně Kubánkové</strong> na{' '}
                <a
                  href='mailto:al.kubankova@email.cz'
                  className='text-green-500 dark:text-green-500'
                >
                  al.kubankova@email.cz
                </a>{' '}
                či volejte{' '}
                <a
                  href='tel:+420606921133'
                  className='text-green-500 dark:text-green-500'
                >
                  606 921 133
                </a>{' '}
                . Těšíme se na Vás a Vaše děti!
              </p>
            </div>
          </Section>
          <DocumentsList />
        </div>
      </div>
    </>
  );
};

export default AdaptationProgramPage;
