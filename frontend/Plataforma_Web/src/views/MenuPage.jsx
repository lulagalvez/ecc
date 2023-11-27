import React, { useState, useMemo, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Pagination,
  Placeholder,
  Navbar,
} from "react-bootstrap";
import { motion } from "framer-motion";

import NavBar from "../globalComponent/components/NavBar.jsx";
import Cards from "../globalComponent/components/Cards.jsx";
import UserContext from "../UserContextApi/UserContext.jsx";
import CardExample from "../globalComponent/components/CardExample.jsx";
import "./style/MenuPage.css";

const Menupage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 12; // Cantidad de Cards por página

  const { allUsers } = useContext(UserContext); //1
  const { activeUsers } = useContext(UserContext); //2
  const { emergencyUsers } = useContext(UserContext); //3
  const { driverUsers } = useContext(UserContext); //4
  const { inactiveUsers } = useContext(UserContext); //5

  const { radioValue } = useContext(UserContext);

  const memoizedRenderCards = useMemo(() => {
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

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, usersToRender.length);
    const currentUsers = usersToRender.slice(startIndex, endIndex);

    setTotalPages(calculateTotalPages(usersToRender));

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

    console.log(
      "La cantidad de cartas faltantes son :",
      remainingPlaceholderCount
    );

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
          <Col xs={12} md={12} className="col-1 my-5">
            <NavBar />
          </Col>
          <Col
            xs={12}
            md={12}
            className="col-2 p-4  d-flex  flex-column align-items-center justify-content-center"
          >
            <Row className="mb-3 col-53">{memoizedRenderCards}</Row>
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
