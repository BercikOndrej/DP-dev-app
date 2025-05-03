import useTeachers from '@/hooks/teachers/useTeachers';
import PrivateTeacherCard from './PrivateTeacherCard';
import TitleText from '../TitleText';
import createSkeletons from '@/utils/helpers/createSkeletons';
import PrivateTeacherSkeletonCard from './PrivateTeacherSkeletonCard';

const PrivateTeachersList = () => {
  const { data: teachers, isLoading } = useTeachers();
  const skeletons = createSkeletons(6);

  return (
    <div className='w-full max-w-[1140px] m-[4vw] xl:mx-auto flex flex-col items-center gap-8'>
      <TitleText>Kontaktní informace</TitleText>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {isLoading
          ? skeletons.map((skeleton) => (
              <PrivateTeacherSkeletonCard key={skeleton} />
            ))
          : teachers?.map((teacher, index) => (
              <PrivateTeacherCard key={index} teacher={teacher} index={index} />
            ))}
      </div>
    </div>
  );
};

export default PrivateTeachersList;
