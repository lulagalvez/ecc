import "./style/RegistroHoras.css";
import { Container, Row, Col, DropdownButton, ButtonGroup, Dropdown, Button, Pagination, Table } from "react-bootstrap";import React, { useState, useEffect } from 'react';
import { BiFilter, BiMessageSquareAdd } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import NavBar from "../globalComponent/components/NavBar";

const RegistroHoras = () => {
  const [exittimes, setExittimes] = useState([]);

  useEffect(() => {
    // Fetch exittimes from the API when the component mounts
    fetchExittimes();
  }, []);

  const fetchExittimes = async () => {
    try {
      const response = await fetch('http://localhost:5000/exittime/');
      if (response.ok) {
        const data = await response.json();
        setExittimes(data);
      } else {
        console.error('Failed to fetch exittimes');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

      <div className="table-container" style={{ marginTop: '200px' }}>
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
            {exittimes.map((exittime, index) => (
              <tr key={exittime.id}>
                <td>{index + 1}</td>
                <td>{exittime.entry_time_user_name}</td>
                <td>{exittime.entry_time_date_time}</td>
                <td>{exittime.date_time}</td>
                <td>{exittime.time_difference}</td>
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

      <div className="margin">
        <Pagination className="fila-3" size="sm">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>

    </>
  );
}

export default RegistroHoras;
