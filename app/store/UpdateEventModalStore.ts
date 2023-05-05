import { create } from "zustand";

export interface UpdateEventModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateEventModalStore = create<UpdateEventModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateEventModalStore;
