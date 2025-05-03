import { filesToDownload } from '@/utils/constants';
import TitleText from '../TitleText';
import DownloadFile from './DownloadFile';

const DocumentsList = () => {
  return (
    <div className='w-full container mx-auto flex flex-col items-center gap-8'>
      <TitleText>Dokumenty ke stažení</TitleText>
      <div className='mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center'>
        {filesToDownload.map((file, index) => (
          <DownloadFile
            key={index}
            name={file.name}
            link={file.url}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentsList;
