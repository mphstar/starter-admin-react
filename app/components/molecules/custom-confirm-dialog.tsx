import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { useConfirmDialogStore } from "~/stores/useConfirmDialogStore";

const CustomConfirmDialog = () => {
  const { open, setOpen, onConfirm } = useConfirmDialogStore();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) {
      try {
        setLoading(true);
        await onConfirm(); // ← jalankan fungsi confirm
        setOpen(false); // ← tutup dialog setelah selesai
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin melanjutkan tindakan ini?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Batal
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? "Loading..." : "Ya"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomConfirmDialog;
