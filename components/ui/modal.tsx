import { ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  step?: number;
  totalSteps?: number;
}
const Modal = ({
  body,
  isOpen,
  footer,
  onClose,
  step,
  title,
  totalSteps,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogHeader>
          <div className="mt-4">{body}</div>
          {footer && <div className="mt-4">{footer}</div>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
