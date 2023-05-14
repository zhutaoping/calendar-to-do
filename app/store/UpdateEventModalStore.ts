import { create } from "zustand";

export interface UpdateEventModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUpdateEventModalStore = create<UpdateEventModalState>()(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
