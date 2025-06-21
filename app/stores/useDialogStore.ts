import { create } from "zustand";

type DialogState<T = any> = {
  open: boolean;
  data: T | null;
  setOpen: (value: boolean) => void;
  setData: (data: T) => void;
  reset: () => void;
};

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  data: null,
  setOpen: (value: boolean) => set({ open: value }),
  setData: (data) => set({ data }),
  reset: () => set({ open: false, data: null }),
}));
