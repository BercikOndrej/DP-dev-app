import ContactCard from '@/components/contactCard/ContactCard';
import ContactCardSkeleton from '@/components/contactCard/ContactCardSkeleton';
import GeneralInfoCards from '@/components/GeneralInfoCards';
import PublicTeacherList from '@/components/publicTeachers/PublicTeacherList';
import ParallaxPhoto from '@/components/ParallaxPhoto';
import Reportage from '@/components/Reportage';
import SchoolDayTimeline from '@/components/SchoolDayTimeline';
import TitleText from '@/components/TitleText';
import {PageType} from '@/enums';
import Section from '@/components/Section';
import Subtitle from '@/components/Subtitle';
import useContactInfo from '@/hooks/contactInfo/useContactInfo.ts';

const ForestClubPage = () => {
  const { data: contactInfo, isLoading } = useContactInfo(2);

  return (
    <>
      <ParallaxPhoto className='bg-parallax-forestClub'>
        <div className='flex flex-col gap-8 ' data-aos='fade-up'>
          <p className='font-thin text-4xl'>Lesní dětský klub</p>
          <h1 className='font-bold tracking-widest text-6xl'>Pojďte ven!</h1>
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
          <GeneralInfoCards pageType={PageType.FOREST_CLUB} />
        </div>
        <div className='col-span-8 flex flex-col gap-16 p-4 md:p-12'>
          <Section>
            <TitleText>Lesní dětský klub</TitleText>
            <p>
              Pojďte ven je prostor pro učení, rozvoj a tvořivost dětí v období
              předškolního věku, který je úzce spjat s pobytem v přírodě. Děti
              jej nazývají „školka“. Naši průvodci pomáhají dětem objevovat a
              poznávat svět kolem sebe prostřednictvím vlastních jedinečných
              zkušeností. Děti jim tykají a oslovují je křestními jmény. Ve
              skupině je maximálně 12 dětí a 2 průvodci. Pro děti a s dětmi
              vaříme pestrou vegetariánskou stravu přímo na místě.
            </p>
            <Reportage />
            <p>
              Prostory LDK otevíráme v 7:30. Není ale nutné vozit děti do
              Lošova. Naši průvodci také jezdí s dětmi ráno v 8:10 autobusem
              č.11 ze zastávky Hlavní nádraží v Olomouci. Prostory Klubu se
              zavírají v 15:20 a děti, které jezdí autobusem č.11, se vrací na
              Hlavní nádraží v 16:02.
            </p>
          </Section>
          <Section>
            <TitleText>Jak s dětmi pracujeme?</TitleText>
            <div>
              <Subtitle>
                Podporujeme kontakt dětí s přírodou a přirozený pohyb v krajině
              </Subtitle>
              <p>
                Otevřený prostor a okolní les, kopce a louky vybízí k pohybu,
                vyžadují orientaci v prostoru, odhadnout své síly a přizpůsobit
                se členitosti terénu. Děti jsou v kontaktu také s domácími
                zvířaty (pes, kočky, na pastvinách koně a ovce).
              </p>
            </div>
            <div>
              <Subtitle>
                Poznávání světa a sebe sama skrze zákonitosti přírody
              </Subtitle>
              <p>
                Děti poznávají koloběh života v přírodě, inspirují se
                přírodninami nebo jevy, které venku pozorují, učí se, jak k Zemi
                přistupovat s úctou.
              </p>
            </div>
            <div>
              <Subtitle>Individuální přístup a vzájemný respekt</Subtitle>
              <p>
                Díky menší skupině mohou průvodci pracovat s dětmi na základě
                jejich zájmu, motivace a jedinečných kvalit. Pravidla ve skupině
                se tvoří na základě zkušeností, domlouváme se na tom, co je
                podstatné. Pravidla se vztahují na slušné chování, pobyt v lese,
                ve městě i v zázemí klubu. Děti se také učí hledat společná
                řešení a spolupracovat ve skupině.
              </p>
            </div>
            <div>
              <Subtitle>Vzájemná spolupráce s rodiči</Subtitle>
              <p>
                Komunitní způsob fungování Lesního dětského klubu je základem
                jeho udržitelnosti. Spolupráce a dobré vztahy s rodiči vytvářejí
                kladné prostředí pro výchovu dětí. Rodiče mají možnost
                vyjadřovat se k činnosti spolku a podílet se na společných
                aktivitách.
              </p>
            </div>
          </Section>

          <Section>
            <TitleText>Průběh dne</TitleText>
            <SchoolDayTimeline />
          </Section>

          <Section>
            <TitleText>Akce a aktivity</TitleText>
            <div className='flex flex-col gap-4'>
              <p>
                Jedenkrát za měsíc chodíme s dětmi na představení do Divadla
                hudby.
              </p>
              <p>Děti chodí na výlety, do ZOO, do Muzea.</p>
              <p>
                Realizujeme také akce pro děti v rámci Kola roku a přípravy na
                významné svátky (tříkrálové divadlo, masopustní karneval,
                velikonoční přípravy, zdobení vánočního stromku apod.).
              </p>
              <p>
                Pořádáme pravidelně Slavnosti, kterých se účastní i rodiče dětí
                (sv. Michal, vynášení Morany apod.).
              </p>
            </div>
          </Section>

          <Section>
            <TitleText>Stravování</TitleText>
            <div className='flex flex-col gap-4'>
              <p>
                Stravování probíhá formou dvou svačin a oběda. Dopolední svačinu
                si děti nosí z domova, oběd a menší odpolední svačinu zajištuje
                Lesní dětský klub.
              </p>
              <p>
                Vaříme pestrou vyváženou vegetariánskou stravu. Po domluvě je
                možné přizpůsobit stravu dětem s bezlepkovou dietou či jiným
                specifickým omezením.
              </p>
              <p>
                Děti mají možnost vybrat si z jídla, co mají rády. Jídlo je jim
                prezentováno jako „bufet“, z něhož si volí kombinaci, která jim
                vyhovuje.
              </p>
              <p>
                S dětmi také pravidelně vaříme na ohni nebo společně pečeme.
              </p>
            </div>
          </Section>

          <Section>
            <TitleText>Počasí a vhodné vybavení</TitleText>
            <div className='flex flex-col gap-4'>
              <p>
                Je potřeba dítě vhodně vybavit (gumáčky, pláštěnka, náhradní
                oblečení, nepromokavé kalhoty apod.). Děti si nosí vlastní
                batůžek a pití. Děti nenutíme být venku v hodně mokrém či
                studeném počasí, ale je třeba počítat, že valnou většinu dne
                venku budou a vhodné oblečení jim v tom může pomoci.
              </p>
              <p>
                O vhodném vybavení vás budeme podrobněji informovat při procesu
                přijetí.
              </p>
            </div>
          </Section>

          <PublicTeacherList />
        </div>
      </div>
    </>
  );
};

export default ForestClubPage;
