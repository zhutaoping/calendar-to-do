import { UseBoundStore, create } from "zustand";

export interface RequestModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

//* return a object with the state and the actions
export const useRequestModalStore = create<RequestModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type LoginModalType = typeof useRequestModalStore extends UseBoundStore<
  infer T
>
  ? T
  : never;
