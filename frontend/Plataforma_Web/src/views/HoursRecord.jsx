import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { BiFilter, BiMessageSquareAdd } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import NavBar from "../globalComponent/components/NavBar";
import "./style/RegistroHoras.css";
import "./style/PaginationList.css";

const HoursrRecord = () => {
  const [exittimes, setExittimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items to display per page

  useEffect(() => {
    fetchExittimes();
  }, []);

  const fetchExittimes = async () => {
    try {
      const response = await fetch("http://localhost:5000/exittime/");
      if (response.ok) {
        const data = await response.json();
        setExittimes(data);
      } else {
        console.error("Failed to fetch exittimes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exittimes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Container fluid>
          <Row className="flex-column page">
            <Col className="w-100 col-1" xs={12} md={2}>
              <NavBar usuario="Joseeeeee" />
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* Pagination */}
      <div className="pagination-container" style={{ marginTop: "160px" }}>
        <div className="pagination">
          {exittimes.length > itemsPerPage && (
            <ul className="pagination-list">
              {Array(Math.ceil(exittimes.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Bombero</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Tiempo</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((exittime, index) => (
              <tr key={exittime.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                  {exittime.first_name} {exittime.last_name}
                </td>
                <td>{exittime.entry_time_date_time}</td>
                <td>{exittime.exit_time_date_time}</td>
                <td>{exittime.time_spent}</td>
                <td className="table-cell button-cell">
                  <Button variant="primary" type="reset" size="sm">
                    <span>
                      <AiFillEdit />
                    </span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination">
          {exittimes.length > itemsPerPage && (
            <ul className="pagination-list">
              {Array(Math.ceil(exittimes.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default HoursrRecord;
