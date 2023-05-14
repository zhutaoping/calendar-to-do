import { create } from "zustand";

export interface SignUpModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSignUpModalStore = create<SignUpModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type SignUpModalType = ReturnType<typeof useSignUpModalStore>;
