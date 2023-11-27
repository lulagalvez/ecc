import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion"; // Importa motion de Framer Motion
import ImagenPrueba from "../../image/prueba-imagen.jpg";

import "../styles/Cards.css";

/**
 * Componente que representa una tarjeta de usuario con información básica.
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.state - Estado del usuario (0: Inactivo, 1: Activo, 2: En emergencia, 3: Conductor).
 * @param {string} props.role - Rol del usuario.
 * @param {string} props.fullName - Nombre completo del usuario.
 * @param {string} props.email - Correo electrónico del usuario.
 * @returns {JSX.Element} Elemento JSX del componente Cards.
 */
function Cards({ state, role, fullName, email }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const controls = useAnimation(); // Inicializa el control de animación

  /**
   * Inicia la animación de tambaleo (wobble) al pasar el mouse sobre la tarjeta.
   */
  const startWobbleAnimation = () => {
    controls.start({
      rotate: [0, -10, 10, -5, 5, 0], // Secuencia de rotación
      transition: { duration: 0.5, repeat: Infinity }, // Configuración de la animación
    });
  };

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
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Card
          className="text-center"
          bg="dark"
          border="secondary"
          text="white"
          style={{ width: "18rem" }}
          onClick={handleShow}
          onMouseEnter={startWobbleAnimation} // Inicia la animación al pasar el mouse sobre la tarjeta
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
      </motion.div>

      {/* Modal para mostrar detalles adicionales del usuario */}
      <Modal centered size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* Contenido del modal, si es necesario */}</Modal.Body>
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
