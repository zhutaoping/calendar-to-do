import { create } from "zustand";

interface LoginModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModalStore = create<LoginModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModalStore;
