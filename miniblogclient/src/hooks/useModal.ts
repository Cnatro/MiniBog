import { useState } from "react";

const useModal = () => {
  const [isOpenModal, setModelOpen] = useState(false);

  const onOpenModel = () => {
    setModelOpen(true);
  };

  const onCloseModal = () => {
    setModelOpen(false);
  };

  return { isOpenModal, onOpenModel, onCloseModal };
};

export default useModal;