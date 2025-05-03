import ActionList from '@/components/ActionList';

const ActionsPage = () => {
  return (
    <div className='flex flex-col m-[4vw] xl:mx-auto gap-12 justify-center'>
      <h1 className='mx-auto max-w-[1140px] text-center font-title text-5xl mb-8'>
        Aktuality a akce
      </h1>
      <ActionList />
    </div>
  );
};

export default ActionsPage;
