import React, { useState } from "react";

import { Container, Row, Col, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import NavBar from "../globalComponent/components/NavBar.jsx";
import Cards from "../globalComponent/components/Cards.jsx";
import "./style/MenuPage.css";

const Menupage = () => {
  const pageSize = 12; // Cantidad de Cards por página
  const [currentPage, setCurrentPage] = useState(1);

  const cardData = [
    {
      id: 1,
      estado: "DISPONIBLE",
      ocupacion: "Capitán de Bomberos",
      nombre: "Carlos Rodríguez",
    },
    {
      id: 2,
      estado: "AUSENTE",
      ocupacion: "Bombero Voluntario",
      nombre: "Alejandra Gómez",
    },
    {
      id: 3,
      estado: "DISPONIBLE",
      ocupacion: "Sargento de Bomberos",
      nombre: "Roberto Mendoza",
    },
    {
      id: 4,
      estado: "AUSENTE",
      ocupacion: "Bombero Rescatista",
      nombre: "Laura Fernández",
    },
    {
      id: 5,
      estado: "DISPONIBLE",
      ocupacion: "Teniente de Bomberos",
      nombre: "Eduardo Castillo",
    },
    {
      id: 6,
      estado: "DISPONIBLE",
      ocupacion: "Bombero Paramédico",
      nombre: "Ana Pérez",
    },
    {
      id: 7,
      estado: "AUSENTE",
      ocupacion: "Capitana de Bomberos",
      nombre: "Martín González",
    },
    {
      id: 8,
      estado: "EMERGENCIA",
      ocupacion: "Bombero de Rescate Acuático",
      nombre: "María Ruiz",
    },
    {
      id: 9,
      estado: "EMERGENCIA",
      ocupacion: "Bombero Especialista",
      nombre: "Javier López",
    },
    {
      id: 10,
      estado: "AUSENTE",
      ocupacion: "Bombero Técnico",
      nombre: "Silvia Torres",
    },
    {
      id: 11,
      estado: "DISPONIBLE",
      ocupacion: "Teniente de Bomberos",
      nombre: "Luisa Morales",
    },
    {
      id: 12,
      estado: "AUSENTE",
      ocupacion: "Bombero Rescatista",
      nombre: "Ricardo Sánchez",
    },
    {
      id: 13,
      estado: "DISPONIBLE",
      ocupacion: "Capitana de Bomberos",
      nombre: "Pedro Navarro",
    },
    {
      id: 14,
      estado: "AUSENTE",
      ocupacion: "Bombero Paramédico",
      nombre: "Isabel García",
    },
    {
      id: 15,
      estado: "DISPONIBLE",
      ocupacion: "Sargento de Bomberos",
      nombre: "Juan Torres",
    },
    {
      id: 16,
      estado: "DISPONIBLE",
      ocupacion: "Bombero de Rescate Acuático",
      nombre: "Sofía Ramírez",
    },
    {
      id: 17,
      estado: "AUSENTE",
      ocupacion: "Bombero Voluntario",
      nombre: "Mateo Díaz",
    },
    {
      id: 18,
      estado: "EMERGENCIA",
      ocupacion: "Bombero Especialista en Incendios Forestales",
      nombre: "Laura Gómez",
    },
    {
      id: 19,
      estado: "EMERGENCIA",
      ocupacion: "Bombero Técnico en Emergencias Médicas",
      nombre: "Hugo Mendoza",
    },
    {
      id: 20,
      estado: "AUSENTE",
      ocupacion: "Capitán de Bomberos",
      nombre: "Camila López",
    },
    {
      id: 21,
      estado: "DISPONIBLE",
      ocupacion: "Bombero Rescatista",
      nombre: "Diego Fernández",
    },
    {
      id: 22,
      estado: "AUSENTE",
      ocupacion: "Teniente de Bomberos",
      nombre: "Carolina Pérez",
    },
    {
      id: 23,
      estado: "DISPONIBLE",
      ocupacion: "Bombero Paramédico",
      nombre: "Miguel Rodríguez",
    },
    {
      id: 24,
      estado: "DISPONIBLE",
      ocupacion: "Capitana de Bomberos",
      nombre: "Adriana Soto",
    },
    {
      id: 25,
      estado: "AUSENTE",
      ocupacion: "Sargento de Bomberos",
      nombre: "Javier González",
    },
    {
      id: 26,
      estado: "EMERGENCIA",
      ocupacion: "Bombero de Rescate Acuático",
      nombre: "Patricia Torres",
    },
    {
      id: 27,
      estado: "EMERGENCIA",
      ocupacion: "Bombero de Incendios Forestales",
      nombre: "Andrés Ramírez",
    },
    {
      id: 28,
      estado: "AUSENTE",
      ocupacion: "Bombero Técnico",
      nombre: "María Fernández",
    },
    {
      id: 29,
      estado: "DISPONIBLE",
      ocupacion: "Teniente de Bomberos",
      nombre: "Roberto Díaz",
    },
    {
      id: 30,
      estado: "AUSENTE",
      ocupacion: "Bombero Rescatista",
      nombre: "Ana Navarro",
    },
    // Agrega más datos similares para las otras Cards
  ];

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(cardData.length / pageSize);

  // Función para calcular el índice inicial y final de las Cards a mostrar en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, cardData.length);
  const currentCards = cardData.slice(startIndex, endIndex);

  // Función para renderizar las Cards
  const renderCards = () => {
    return currentCards.map((card) => (
      <Col key={card.id} xs={12} md={4} lg={2} className="my-4">
        <Cards
          estado={card.estado}
          ocupacion={card.ocupacion}
          nombre={card.nombre}
        />
      </Col>
    ));
  };

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <NavBar />
          </Col>
          <Col
            xs={12}
            md={12}
            className="col-2 d-flex flex-column align-items-center justify-content-center"
          >
            <Row className="mb-3">{renderCards()}</Row>
            <Pagination size="md">
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
          <Col xs={12} md={12} className="p-0 col-3"></Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Menupage;
