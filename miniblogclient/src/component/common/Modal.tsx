import React, { type ReactNode, type CSSProperties } from "react";
import AppModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  afterOpenModal?: () => void;
  overrideStyle?: CSSProperties;
  children: ReactNode | ReactNode[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  afterOpenModal = () => {},
  overrideStyle = {},
  children,
}) => {
  const defaultStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      position: "fixed" as const,
      padding: "50px 20px",
      maxWidth: "500px",
      transition: "all .5s ease",
      zIndex: 9999,
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      boxShadow: "0 5px 10px rgba(0, 0, 0, .1)",
      animation: "scale .3s ease",
      ...overrideStyle,
    },
  };

  AppModal.setAppElement("#root");

  return (
    <AppModal
      closeTimeoutMS={300}
      contentLabel="Product Modal"
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      style={defaultStyle}
    >
      {children}
    </AppModal>
  );
};

export default Modal;
