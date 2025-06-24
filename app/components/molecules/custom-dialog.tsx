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
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

const CustomDialog: React.FC<Props> = ({
  title,
  description,
  children,
  footer,
  className,
}) => {
  const { open, setOpen } = useDialogStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`max-h-[90%] flex flex-col ${className}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <ScrollArea className="py-4 flex-1 overflow-y-auto">
          {children}
        </ScrollArea>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
