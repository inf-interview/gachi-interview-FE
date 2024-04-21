"use client";

import Modal from "../Modal";
import Backdrop from "../Backdrop";
import { createPortal } from "react-dom";
import { useContext, ReactNode } from "react";
import { ModalContext } from "./context";
import { Button } from "../ui/button";

export const useModal = () => {
  const { modal, setModal } = useContext(ModalContext);

  const openModal = (modal: ReactNode) => {
    setModal(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  return { openModal, closeModal, modal };
};

export const useErrorModal = () => {
  const { openModal, closeModal } = useModal();
  const openErrorModal = (message: string) => {
    openModal(
      <Modal header="😭" footer={<Button onClick={closeModal}>확인</Button>}>
        {message}
      </Modal>,
    );
  };

  return openErrorModal;
};

export const ModalContainer = () => {
  const { modal, closeModal } = useModal();

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    closeModal();
  };

  return modal
    ? createPortal(
        <Backdrop onClick={onBackdropClick}>{modal}</Backdrop>,
        document.getElementById("modal-root") as Element,
      )
    : null;
};
