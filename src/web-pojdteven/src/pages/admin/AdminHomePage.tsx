const AdminHomePage = () => {
  return (
    <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
      <span className='font-title text-center text-6xl font-semibold'>
        Vítejte v sekci admin!
      </span>
      <span className='font-body text-center text-xl text-slate-400 dark:text-slate-600'>
        Zde můžete spravovat své webové stránky.
      </span>
    </div>
  );
};

export default AdminHomePage;
