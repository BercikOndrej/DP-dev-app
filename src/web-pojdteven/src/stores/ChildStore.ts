import { create } from 'zustand';

interface ChildStore {
  childId: string | undefined;
  setChildId: (id: string) => void;
}

const useChildStore = create<ChildStore>((set) => ({
  childId: undefined,
  setChildId: (id: string) => set(() => ({ childId: id })),
}));

export default useChildStore;
