import { create } from "zustand";

export interface UpdateEventModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUpdateEventModalStore = create<UpdateEventModalStore>()(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
