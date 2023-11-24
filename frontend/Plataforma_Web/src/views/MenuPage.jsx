import React, { useState, useEffect } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import { getUsersByState } from "../functionsApi/UserApi.jsx";

import NavBar from "../globalComponent/components/NavBar.jsx";
import Cards from "../globalComponent/components/Cards.jsx";

import "./style/MenuPage.css";

const Menupage = () => {
  const pageSize = 12; // Cantidad de Cards por página

  const [currentPage, setCurrentPage] = useState(1);
  const [loadComplete, setLoadComplete] = useState(false);

  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [emergencyUsers, setEmergencyUsers] = useState([]);
  const [driverUsers, setDriverUsers] = useState([]);

  useEffect(() => {
    // Realiza la solicitud HTTP para obtener la lista de bomberos por estado

    // Variable para indicar si la carga ha finalizado
    let isMounted = true;

    const fetchData = async () => {
      try {
        const inactiveResponse = await getUsersByState(0);
        isMounted && setInactiveUsers(inactiveResponse);

        const activeResponse = await getUsersByState(1);
        isMounted && setActiveUsers(activeResponse);

        const emergencyResponse = await getUsersByState(2);
        isMounted && setEmergencyUsers(emergencyResponse);

        const driverResponse = await getUsersByState(3);
        isMounted && setDriverUsers(driverResponse);
      } catch (error) {
        console.error(
          "Error al obtener la lista de bomberos por estado:",
          error
        );
      } finally {
        // Cuando la carga ha finalizado, actualiza el estado de carga
        isMounted && setLoadComplete(true);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };

    // Se ejecuta solo al montar el componente
  }, []);

  // Este useEffect se ejecutará una vez que la carga ha finalizado
  useEffect(() => {
    if (loadComplete) {
      console.log("Usuarios inactivos: ", inactiveUsers);
      console.log("Usuarios activos: ", activeUsers);
      console.log("Usuarios en emergencia: ", emergencyUsers);
      console.log("Usuarios conductores: ", driverUsers);

      // Dependiendo de tus necesidades, puedes hacer más cosas aquí.
    }

    // Limpia la variable al desmontar el componente
    return () => {
      // Restablece loadComplete al desmontar
      setLoadComplete(false);
    };
  }, [loadComplete, inactiveUsers, activeUsers, emergencyUsers, driverUsers]);

  // Calcular la cantidad total de páginas
  const totalPages = Math.ceil(inactiveUsers.length / pageSize);

  // Función para calcular el índice inicial y final de las Cards a mostrar en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, inactiveUsers.length);
  const currentUsers = inactiveUsers.slice(startIndex, endIndex);

  // Función para renderizar las Cards
  const renderCards = () => {
    return inactiveUsers.map((user) => {
      console.log("Bombero inactivo:", user);
      return (
        <Col key={user.id} xs={12} md={4} lg={6} className="my-4">
          <Cards
            estado={user.state}
            ocupacion={user.role}
            nombre={`${user.first_name} ${user.last_name}`}
          />
        </Col>
      );
    });
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
