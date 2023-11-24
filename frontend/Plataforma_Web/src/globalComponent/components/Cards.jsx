import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import ImagenPrueba from "../../image/prueba-imagen.jpg";

import "../styles/Cards.css";

function Cards({ estado, ocupacion, nombre }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Determina el color de fondo según el estado
  let backgroundColor;
  switch (estado) {
    case 0: // Cambié "DISPONIBLE" a 0 según la estructura de datos
      backgroundColor = "green";
      break;
    case 1: // Cambié "AUSENTE" a 1 según la estructura de datos
      backgroundColor = "gray";
      break;
    case 2: // Cambié "EMERGENCIA" a 2 según la estructura de datos
      backgroundColor = "red";
      break;
    default:
      backgroundColor = "dark";
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
            {estado === 0
              ? "DISPONIBLE"
              : estado === 1
              ? "AUSENTE"
              : "EMERGENCIA"}
          </Card.Title>
          <Card.Text className="mb-2">{ocupacion}</Card.Text>
          <div className="mb-2 custom-divider border-top"></div>
          {/* Puedes cambiar el valor duro "13221312" por la información real si es necesario */}
          <Card.Text className="mb-2">{"13221312"}</Card.Text>
          <div className="mb-2 custom-divider border-top"></div>
          <Card.Text className="mb-2">{nombre}</Card.Text>
        </Card.Body>
      </Card>

      <Modal centered size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Estado:{" "}
            {estado === 0
              ? "DISPONIBLE"
              : estado === 1
              ? "AUSENTE"
              : "EMERGENCIA"}
          </p>
          <p>Ocupación: {ocupacion}</p>
        </Modal.Body>
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
