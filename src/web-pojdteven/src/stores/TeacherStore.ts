import { create } from 'zustand';

interface TeacherStore {
  teacherId: string | undefined;
  setTeacherId: (id: string) => void;
}

const useTeacherStore = create<TeacherStore>((set) => ({
  teacherId: undefined,
  setTeacherId: (id: string) => set(() => ({ teacherId: id })),
}));

export default useTeacherStore;
