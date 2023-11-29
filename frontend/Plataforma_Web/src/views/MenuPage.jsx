import React, { useState, useMemo, useContext } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";

import NavBar from "../globalComponent/components/NavBar.jsx";
import Cards from "../globalComponent/components/Cards.jsx";
import UserContext from "../UserContextApi/UserContext.jsx";
import CardExample from "../globalComponent/components/CardExample.jsx";
import "./style/MenuPage.css";

/**
 * Componente funcional que representa la página de menú con tarjetas de usuarios y paginación.
 * @returns {JSX.Element} Elemento JSX de la página de menú.
 */
const Menupage = () => {
  // Estado para el número de página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para el número total de páginas
  const [totalPages, setTotalPages] = useState(1);

  // Cantidad de Cards por página
  const pageSize = 12;

  // Contexto de usuario para acceder a las listas de usuarios según el estado
  const { allUsers, activeUsers, emergencyUsers, driverUsers, inactiveUsers } =
    useContext(UserContext);

  // Valor actual del radio para determinar la lista de usuarios a mostrar
  const { radioValue } = useContext(UserContext);

  // Función memoizada para renderizar las tarjetas de usuarios
  const memoizedRenderCards = useMemo(() => {
    // Función para calcular el número total de páginas
    const calculateTotalPages = (usersList) =>
      Math.ceil(usersList.length / pageSize);

    // Lista de usuarios a renderizar según el radioValue
    let usersToRender = [];
    switch (radioValue) {
      case "1":
        usersToRender = allUsers;
        break;
      case "2":
        usersToRender = activeUsers;
        break;
      case "3":
        usersToRender = emergencyUsers;
        break;
      case "4":
        usersToRender = driverUsers;
        break;
      case "5":
        usersToRender = inactiveUsers;
        break;
      default:
        usersToRender = inactiveUsers;
    }

    // Índices de inicio y fin para la paginación
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, usersToRender.length);

    // Usuarios actuales a mostrar en la página
    const currentUsers = usersToRender.slice(startIndex, endIndex);

    // Calcular el número total de páginas
    setTotalPages(calculateTotalPages(usersToRender));

    // Renderizar las tarjetas de usuarios
    const renderCards = currentUsers.map((user) => (
      <Col
        key={user.id}
        className="my-4 d-flex align-items-center justify-content-center"
      >
        <Cards
          state={user.state}
          role={user.role}
          fullName={`${user.first_name} ${user.last_name}`}
          email={user.email}
        />
      </Col>
    ));

    // Llenar el resto de las posiciones con Placeholder si no hay suficientes tarjetas
    const remainingPlaceholderCount = pageSize - renderCards.length;

    for (let i = 0; i < remainingPlaceholderCount; i++) {
      renderCards.push(
        <Col
          key={`placeholder-${i}`}
          className="my-4 d-flex align-items-center justify-content-center"
        >
          <CardExample />
        </Col>
      );
    }

    return renderCards;
  }, [radioValue, currentPage, totalPages, allUsers]);

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
        <Row className="d-flex flex-column">
          {/* Barra de navegación */}
          <Col xs={12} md={12} className="col-1 my-5">
            <NavBar />
          </Col>
          {/* Contenedor de tarjetas y paginación */}
          <Col
            xs={12}
            md={12}
            className="col-2 p-4 d-flex flex-column align-items-center justify-content-center"
          >
            {/* Filas de tarjetas */}
            <Row className="mb-3 col-53">{memoizedRenderCards}</Row>
            {/* Paginación */}
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
        </Row>
      </Container>
    </motion.div>
  );
};

export default Menupage;
