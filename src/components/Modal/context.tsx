"use client";

import React, { ReactNode, createContext } from "react";

export const ModalContext = createContext<{
  modal: React.ReactNode | null;
  setModal: (modal: React.ReactNode) => void;
}>({
  modal: null,
  setModal: () => {},
});

ModalContext.displayName = "ModalContext";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = React.useState<React.ReactNode | null>(null);

  return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};
