import { create } from "zustand";

export interface AddEventModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddEventModalStore = create<AddEventModalState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
