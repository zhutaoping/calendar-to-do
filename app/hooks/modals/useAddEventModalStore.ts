import { create } from "zustand";

interface AddEventModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddEventModalStore = create<AddEventModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddEventModalStore;
