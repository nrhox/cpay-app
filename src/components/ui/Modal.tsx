import { X } from "lucide-react";
import type { ReactNode } from "react";
import Button from "./Button";

export default function Modal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="subheading">{title}</h2>
          <Button
            type="button"
            variant="ghost"
            className="h-9 w-9 p-0"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
