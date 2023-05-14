import { UseBoundStore, create } from "zustand";

export interface LoginModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useLoginModalStore = create<LoginModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type LoginModalType = typeof useLoginModalStore extends UseBoundStore<
  infer T
>
  ? T
  : never;
