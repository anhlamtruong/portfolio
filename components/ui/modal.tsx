"use client";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Suspense, useEffect, useState } from "react";

const DialogContent = React.lazy(() => import("@/components/ui/dialog"));

interface ModalProps {
  title: string;
  description: String;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      {isMounted && (
        <Suspense
          fallback={
            <div className=" items-center justify-center content-center w-full text-center">
              Loading Dialog...
            </div>
          }
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div>{children}</div>
          </DialogContent>
        </Suspense>
      )}
    </Dialog>
  );
};

export default Modal;
