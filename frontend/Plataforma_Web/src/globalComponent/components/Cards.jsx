import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import ImagenPrueba from "../../image/prueba-imagen.jpg";

import "../styles/Cards.css";

function Cards({ state, role, fullName, email }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Determina el color de fondo y el texto del título según el estado
  let backgroundColor, titleText;
  switch (state) {
    case 0: // 0 : Inactivo
      backgroundColor = "gray";
      titleText = "Ausente";
      break;
    case 1: // 1 : Activo
      backgroundColor = "green";
      titleText = "DISPONIBLE";
      break;
    case 2: //2 : En emergencia
      backgroundColor = "red";
      titleText = "EMERGENCIA";
      break;
    case 3: // 3 : Conductor
      backgroundColor = "blue";
      titleText = "CONDUCTOR";
      break;
    default:
      backgroundColor = "dark";
      titleText = "";
  }

  return (
    <>
      <Card
        className="text-center"
        bg="dark"
        border="dark"
        text="white"
        style={{ width: "18rem" }}
        onClick={handleShow}
      >
        <Card.Img variant="top" src={ImagenPrueba} />
        <Card.Body>
          <Card.Title className="my-3 py-2" style={{ backgroundColor }}>
            {titleText}
          </Card.Title>
          <Card.Text className="mb-2">{role}</Card.Text>
          <div className="mb-2 custom-divider border-top"></div>
          <Card.Text className="mb-2">{email}</Card.Text>
          <div className="mb-2 custom-divider border-top"></div>
          <Card.Text className="mb-2">{fullName}</Card.Text>
        </Card.Body>
      </Card>

      <Modal centered size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cards;
