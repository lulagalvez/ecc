import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../styles/OffCanvas.css";
import { MdMenu } from "react-icons/md";
import ButtonOptionsState from "./ButtonOptionsState";
import Logo from "../../image/shield-image.png";

function OffCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" onClick={handleShow} size="lg">
        <MdMenu />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll="true"
        backdrop={false}
        placement="start"
        autoFocus={false}
        className="custom-offcanvas"
      >
        <Offcanvas.Header
          closeButton
          className="offcanvas-header  d-flex  align-items-center justify-content-betwen"
          closeVariant="white"
        >
          <img src={Logo} alt="Logo" className="offcanvas-logo" />
          <Offcanvas.Title className="offcanvas-title ms-5">
            Primera Compañía de Bomberos: Talcahuano
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          <ButtonOptionsState />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
