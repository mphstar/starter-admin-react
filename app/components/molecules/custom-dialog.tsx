import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import React from "react";
import { useDialogStore } from "~/stores/useDialogStore";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const CustomDialog: React.FC<Props> = ({
  title,
  description,
  children,
  footer,
}) => {
  const { open, setOpen } = useDialogStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
