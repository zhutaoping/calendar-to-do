import { create } from "zustand";

interface EventModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEventModalStore = create<EventModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEventModalStore;
