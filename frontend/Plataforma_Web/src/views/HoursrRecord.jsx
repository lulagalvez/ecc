import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";
import NavBar from "../globalComponent/components/NavBar";
import "./style/RegistroHoras.css";
import "./style/PaginationList.css";

const HoursrRecord = () => {
  const [exittimes, setExittimes] = useState([]); // Almacena los datos de las salidas
  const [currentPage, setCurrentPage] = useState(1); // Almacena el número de página actual
  const [itemsPerPage] = useState(20); // Numero de items para mostrar por pagina

  // Efecto secundario que se ejecuta al montar el componente
  useEffect(() => {
    fetchExittimes();
  }, []);

  // Función asincrónica para realizar la solicitud de datos
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

  // Se calcula los índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exittimes.slice(indexOfFirstItem, indexOfLastItem);

  // Función que maneja el cambio de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Función para convertir los datos de exittimes a un formato adecuado para exportar como un archivo CSV
  const transformDataToCSV = () => {
    const csvData = [
      ["#", "Bombero", "Entrada", "Salida", "Tiempo"],
      ...exittimes.map((exittime, index) => [
        indexOfFirstItem + index + 1,
        `${exittime.first_name} ${exittime.last_name}`,
        exittime.entry_time_date_time,
        exittime.exit_time_date_time,
        exittime.time_spent,
      ]),
    ];
    return csvData;
  };

  return (
    <>
      {/* Contenedor animado con efectos de transición */}
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
            {/* Renderiza la paginación si hay más elementos que el límite por página */}
            {exittimes.length > itemsPerPage && (
              <ul className="pagination-list">
                {/* Genera botones de página según la cantidad de elementos y el límite por página */}
                {Array(Math.ceil(exittimes.length / itemsPerPage))
                  .fill()
                  .map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      {/* Botón de página que ejecuta la función paginate al hacer clic */}
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
        {/* Contenedor de la tabla */}
        <div className="table-container">
          {/* Contenedor del botón de descarga CSV */}
          <div className="download-button-container">
            {/* Enlace CSV que utiliza los datos transformados y configura opciones */}
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
              {/* Mapea y renderiza las filas de la tabla con los datos actuales */}
              {currentItems.map((exittime, index) => (
                <tr key={exittime.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    {exittime.first_name} {exittime.last_name}
                  </td>
                  <td>{exittime.entry_time_date_time}</td>
                  <td>{exittime.exit_time_date_time}</td>
                  <td>{exittime.time_spent}</td>
                  {/* Celda de la tabla con un botón de edición */}
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

        {/* Paginación adicional al final del componente */}
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
      </motion.div>
    </>
  );
};

export default HoursrRecord;
