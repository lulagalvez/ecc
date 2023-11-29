import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import NavBar from "../globalComponent/components/NavBar";
import "./style/LogPage.css";
import { motion } from "framer-motion";

const BinnacleRecord = () => {
  /* const [logs, setLogs] = useState([]); */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25); // Numero de items por pagina
  const [expandedRow, setExpandedRow] = useState(null);

  /* useEffect(() => {
    // Fetch logs when the component mounts
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      // Replace the URL with your endpoint
      const response = await fetch("http://perrera.inf.udec.cl:1522/logs");
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        console.error("Failed to fetch logs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }; */

  const [logs, setLogs] = useState([
    {
      id: 1,
      type: "Uso_único",
      description: "Realizó una verificación de rutina. Todo se ve bien.",
      date_time: "Mar 15 11 2023 08:30:00",
      user: "Juan Pérez",
      truck_patent: "ABC123",
      fuel_level: 0.75,
      water_level: 0.5,
      oil_level: 0.8,
    },
    {
      id: 2,
      type: "Mantenimiento",
      description: "Cambio de aceite completado. Se utilizó aceite sintético.",
      date_time: "Mié 16 11 2023 10:45:00",
      user: "Ana Gómez",
      truck_patent: "XYZ789",
      fuel_level: 0.6,
      water_level: 0.4,
      oil_level: 0.95,
    },
    {
      id: 3,
      type: "Reparación",
      description: "Reemplazó la pieza dañada en el motor.",
      date_time: "Jue 17 11 2023 13:20:00",
      user: "Roberto Fernández",
      truck_patent: "DEF456",
      fuel_level: 0.85,
      water_level: 0.6,
      oil_level: 0.75,
    },
    {
      id: 4,
      type: "Uso_único",
      description: "Prueba de manejo después de la reparación. El camión funciona sin problemas.",
      date_time: "Vie 18 11 2023 09:00:00",
      user: "Eva Rodríguez",
      truck_patent: "GHI012",
      fuel_level: 0.9,
      water_level: 0.7,
      oil_level: 0.85,
    },
  ]);

  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(logs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const renderDescriptionRow = (log, index) => {
    if (expandedRow === index) {
      return (
        <tr key={`${log.id}-description`} className="expanded-row">
          <td colSpan="8">{log.description}</td>
        </tr>
      );
    }
    return null;
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
            {logs.length > itemsPerPage && (
              <ul className="pagination-list">
                {Array.from({ length: totalPages }).map((_, index) => (
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

        {/* Table */}
        <div className="table-container" style={{ marginTop: "20px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Fecha y tiempo</th>
                <th>Usuario</th>
                <th>Patente</th>
                <th>Nivel de combustible</th>
                <th>Nivel de agua</th>
                <th>Nivel de aceite</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <React.Fragment key={log.id}>
                  <tr onClick={() => toggleRow(index)}>
                    <td>{indexOfFirstLog + index + 1}</td>
                    <td>{log.type}</td>
                    <td>{log.date_time}</td>
                    <td>{log.user}</td>
                    <td>{log.truck_patent}</td>
                    <td>{log.fuel_level}</td>
                    <td>{log.water_level}</td>
                    <td>{log.oil_level}</td>
                  </tr>
                  {renderDescriptionRow(log, index)}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="pagination-container" style={{ marginTop: "20px" }}>
          <div className="pagination">
            {logs.length > itemsPerPage && (
              <ul className="pagination-list">
                {Array.from({ length: totalPages }).map((_, index) => (
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

export default BinnacleRecord;

