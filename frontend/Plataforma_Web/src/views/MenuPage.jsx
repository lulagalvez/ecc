import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import { getUsersByState, allUser } from "../functionsApi/UserApi.jsx";

import NavBar from "../globalComponent/components/NavBar.jsx";
import Cards from "../globalComponent/components/Cards.jsx";
import ButtonOptionsState from "../globalComponent/components/ButtonOptionState.jsx";
import "./style/MenuPage.css";

const Menupage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadComplete, setLoadComplete] = useState(false);
  const [radioValue, setRadioValue] = useState("5");

  const [allUsers, setAllUsers] = useState([]); //1
  const [activeUsers, setActiveUsers] = useState([]); //2
  const [emergencyUsers, setEmergencyUsers] = useState([]); //3
  const [driverUsers, setDriverUsers] = useState([]); //4
  const [inactiveUsers, setInactiveUsers] = useState([]); //5

  const pageSize = 12; // Cantidad de Cards por página
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const allUserResponse = await allUser();
        isMounted && setAllUsers(allUserResponse);

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
        isMounted && setLoadComplete(true);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (loadComplete) {
      console.log("Todos los usuarios", allUsers);
      console.log("Usuarios inactivos: ", inactiveUsers);
      console.log("Usuarios activos: ", activeUsers);
      console.log("Usuarios en emergencia: ", emergencyUsers);
      console.log("Usuarios conductores: ", driverUsers);

      // Recalcula el total de páginas cuando cambia la lista de usuarios
      const calculateTotalPages = (usersList) =>
        Math.ceil(usersList.length / pageSize);

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

      setTotalPages(calculateTotalPages(usersToRender));
    }
  }, [
    loadComplete,
    inactiveUsers,
    activeUsers,
    emergencyUsers,
    driverUsers,
    allUsers,
    radioValue,
    pageSize,
  ]);

  const memoizedRenderCards = useMemo(() => {
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

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, usersToRender.length);
    const currentUsers = usersToRender.slice(startIndex, endIndex);

    return currentUsers.map((user) => (
      <Col key={user.id} xs={12} md={4} lg={2} className="my-4">
        <Cards
          state={user.state}
          role={user.role}
          fullName={`${user.first_name} ${user.last_name}`}
          email={user.email}
        />
      </Col>
    ));
  }, [
    radioValue,
    activeUsers,
    emergencyUsers,
    driverUsers,
    inactiveUsers,
    currentPage,
    pageSize,
    allUsers,
  ]);

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
            className="col-4 my-0 py-4 d-flex align-items-center justify-content-between"
          >
            <ButtonOptionsState
              radioValue={radioValue}
              setRadioValue={setRadioValue}
            ></ButtonOptionsState>
          </Col>
          <Col
            xs={12}
            md={12}
            className="col-2 d-flex flex-column align-items-center justify-content-center"
          >
            <Row className="mb-3">{memoizedRenderCards}</Row>
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
