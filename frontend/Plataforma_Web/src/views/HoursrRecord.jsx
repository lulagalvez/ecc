import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";
import NavBar from "../globalComponent/components/NavBar";
import "./style/RegistroHoras.css";
import "./style/PaginationList.css";

const HoursrRecord = () => {
  const [exittimes, setExittimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Numero de items para mostrar por pagina


  useEffect(() => {
    fetchExittimes();
  }, []);

  const fetchExittimes = async () => {
    try {
      const response = await fetch("http://perrera.inf.udec.cl:1522/exittime/");
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
  const transformDataToCSV = () => {
    const csvData = [
      ["#", "Bombero", "Entrada", "Salida", "Tiempo"],
      ...exittimes.map((exittime, index) => [
        indexOfFirstItem + index + 1,
        `${exittime.first_name} ${exittime.last_name}`,
        exittime.entry_time_date_time,
        exittime.exit_time_date_time,
        exittime.time_spent
      ])
    ];
    return csvData;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <NavBar />

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
                      className={`page-item ${currentPage === index + 1 ? "active" : ""
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
          <div className="download-button-container">
            <CSVLink
              data={transformDataToCSV()}
              filename={"registro_horas.csv"}
              className="btn btn-success"
              separator={";"}
            >
              Descargar CSV
            </CSVLink>
          </div>
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
                      className={`page-item ${currentPage === index + 1 ? "active" : ""
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
      </motion.div>
    </>
  );
};

export default HoursrRecord;
