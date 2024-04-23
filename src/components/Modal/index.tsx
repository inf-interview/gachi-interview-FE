"use client";

import { useEffect, useRef, useState } from "react";

interface ModalProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = ({ children, header, footer }: ModalProps) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const buttons = footerRef.current.querySelectorAll("button");
    if (buttons.length === 0) return;

    buttons[buttons.length - 1]?.focus();
  }, [footerRef]);
  return (
    <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[425px]">
      {header && (
        <header className="text-lg font-semibold leading-none tracking-tight">{header}</header>
      )}
      <div className="">{children}</div>
      {footer && (
        <footer className="border-gray-200 flex justify-end gap-2" ref={footerRef}>
          {footer}
        </footer>
      )}
    </div>
  );
};

export default Modal;
