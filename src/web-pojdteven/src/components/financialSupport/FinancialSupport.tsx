import TitleText from '../TitleText';
import PaymentForm from './PaymentForm';
import QrCodeDrawer from './QrCodeDrawer';

const FinancialSupport = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto'>
      <div>
        <TitleText>Finanční podpora</TitleText>
        <div className='flex flex-col gap-4 justify-between mt-4'>
          <p>
            Můžete podpořit i finančním darem, na který Vám vystavíme darovací
            smlouvu.
          </p>
          <p>
            Svůj finanční dar můžete také zaslat pomocí platby QR kódem.
            Jednoduše si vyberete částku, kterou chcete darovat, a také nám
            můžete zaslat krátkou zpravu, kterou u platby zaznamenáme.
          </p>
          <p>
            Vaše finanční dary využijeme zejména na vzdělávání pracovníků,
            mzdové náklady, případně nákup materiálu. Na formě využití se s Vámi
            rádi domluvíme.
          </p>
        </div>
      </div>
      <PaymentForm />
      <QrCodeDrawer />
    </div>
  );
};

export default FinancialSupport;
