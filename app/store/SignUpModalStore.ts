import { create } from "zustand";

export interface SignUpModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSignUpModalStore = create<SignUpModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type SignUpModalType = ReturnType<typeof useSignUpModalStore>;

export default useSignUpModalStore;
