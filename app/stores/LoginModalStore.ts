import { UseBoundStore, create } from "zustand";

export interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

//* return a object with the state and the actions
export const useLoginModalStore = create<LoginModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type LoginModalType = typeof useLoginModalStore extends UseBoundStore<
  infer T
>
  ? T
  : never;
