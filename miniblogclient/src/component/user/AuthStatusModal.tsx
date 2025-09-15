import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";

const AuthStatusModal = () => {
  const authStatus = useAppSelector((state) => state.misc.authStatus);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (authStatus?.success) {
      setShow(true);
    }
  }, [authStatus]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-success text-white">
        <Modal.Title>SUCCESS</Modal.Title>
      </Modal.Header>
      <Modal.Body>{authStatus?.message}</Modal.Body>
    </Modal>
  );
};

export default AuthStatusModal;
