import { PhotoTag } from '@/enums/PhotoTag';
import { create } from 'zustand';

interface PhotosFilterStore {
  filter: PhotoTag | undefined;
  setFilter: (value: PhotoTag | undefined) => void;
}

const usePhotosFilterStore = create<PhotosFilterStore>((set) => ({
  filter: undefined,
  setFilter: (value: PhotoTag | undefined) => set(() => ({ filter: value })),
}));

export default usePhotosFilterStore;
