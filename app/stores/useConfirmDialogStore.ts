import { create } from "zustand";

type ConfirmDialogState = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onConfirm?: () => Promise<void> | void;
  setOnConfirm: (fn: ConfirmDialogState["onConfirm"]) => void;
};

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  open: false,
  onConfirm: undefined,
  setOpen: (open) => set({ open }),
  setOnConfirm: (fn) => set({ onConfirm: fn }),
}));
