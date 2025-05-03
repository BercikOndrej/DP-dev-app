import useTeachers from '@/hooks/teachers/useTeachers';
import PublicTeacherCard from './PublicTeacherCard';
import createSkeletons from '@/utils/helpers/createSkeletons';
import PublicTeacherCardSkeleton from './PublicTeacherCardSkeleton';

const PublicTeacherList = () => {
  const { data: teachers, isLoading } = useTeachers();
  const skeletons = createSkeletons(6);

  return (
    <div className='flex flex-col gap-8'>
      <h3 className='uppercase tracking-widest text-center text-xl md:text-2xl mb-8 font-title text'>
        Naši lidé:
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {isLoading &&
          skeletons.map((s) => <PublicTeacherCardSkeleton key={s} />)}
        {teachers?.map((teacher, index) => (
          <PublicTeacherCard key={index} teacher={teacher} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PublicTeacherList;
