const Reportage = () => {
  const reportageUrl = `${
    import.meta.env.VITE_SERVER_DOMAIN
  }/static/reportage.mp3`;

  return (
    <div className='flex flex-col gap-4 p-8 rounded-xl bg-slate-50 dark:bg-slate-800'>
      <h2 className='text-2xl md:text-4x font-title'>Reportáž</h2>
      <p className='font-semibold'>
        Poslechněte si krátké povídání o Lesním klubu Pojďte ven.
      </p>
      <audio className='w-full' controls>
        <source src={reportageUrl} type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default Reportage;
