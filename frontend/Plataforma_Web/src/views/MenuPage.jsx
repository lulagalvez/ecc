import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import NavBar from "../globalComponent/components/NavBar.jsx";
import Cards from "../globalComponent/components/Cards.jsx";

import "./style/MenuPage.css";

const Menupage = () => {
  // Hardcodeado , aca se consultara desde la api la informacion 
  const cardData = [
    { id: 1, estado: "DISPONIBLE", ocupacion: "Ayudante" , nombre:"Jose Toledo Arcic" },
    { id: 2, estado: "AUSENTE", ocupacion: "Conductor" , nombre:"Jose Toledo Arcic" },
    { id: 3, estado: "DISPONIBLE", ocupacion: "Ayudante" , nombre:"Jose Toledo Arcic" },
    { id: 4, estado: "AUSENTE", ocupacion: "Conductor" , nombre:"Jose Toledo Arcic" },
    { id: 5, estado: "DISPONIBLE", ocupacion: "Conductor" , nombre:"Jose Toledo Arcic" },
    { id: 6, estado: "DISPONIBLE", ocupacion: "Ayudante" , nombre:"Jose Toledo Arcic" },
    { id: 7, estado: "AUSENTE", ocupacion: "Conductor" , nombre:"Jose Toledo Arcic" },
    { id: 8, estado: "EMERGENCIA", ocupacion: "Conductor" , nombre:"Jose Toledo Arcic" },
    { id: 9, estado: "EMERGENCIA", ocupacion: "Conductor" , nombre:"Jose Toledo Arcic" },
    { id: 10, estado: "AUSENTE", ocupacion: "Conductor" , nombre:"Jose Toledo Arcic" },
    // Agrega datos similares para las otras Cards
  ];

  // Función para renderizar las Cards
  const renderCards = () => {
    return cardData.map((card) => (
      <Col key={card.id} xs={12} md={4} lg={2} className="my-4 ">
        <Cards estado={card.estado} ocupacion={card.ocupacion} nombre={card.nombre} />
      </Col>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container fluid className="pagina">
        <Row className="d-flex">
          <Col xs={12} md={12} className="p-0 col-1 my-5">
            <NavBar></NavBar>
          </Col>
          <Col xs={12} md={12} className="col-2">
            <Row>{renderCards()}</Row>
          </Col>
          <Col xs={12} md={12} className="p-0 col-3">
            {/* Agrega tu contenido en la tercera columna si es necesario */}
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Menupage;

