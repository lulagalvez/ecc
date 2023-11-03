import "./style/RegistroHoras.css";
import { Container,Row,Col, DropdownButton, ButtonGroup, Dropdown,Pagination,Form,Modal,Button } from "react-bootstrap";
import { useState } from 'react';
import { BiFilter, BiMessageSquareAdd } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import NavBar from "../glovalComponent/components/NavBar";


const RegistroHoras = () => {
  const [show, setShow, showOffcanvas, setShowOffcanvas] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onOffcanvasShow = () => setShowOffcanvas(true);
  const onOffcanvasClose = () => setShowOffcanvas(false);
  return (
    <>
    <motion.div
      initial={{ opacity: 0 }} // Ver tema de opacidad en transicion
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
        <Container fluid>
            <Row className="flex-column page ">
                <Col className="w-100 col-1" xs={12} md={2}>
                    <NavBar
                    usuario="Joseeeeee"
                    onOffcanvasShow={onOffcanvasShow}
                    onOffcanvasClose={onOffcanvasClose}
                    showOffcanvas={showOffcanvas}
                    ></NavBar>
                </Col>
            </Row>
        </Container>
    </motion.div>
    <div className="button-container">
      <Button variant='warning' onClick={handleShow} size="lg">
        <BiMessageSquareAdd/>
      </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Formulario de Registro de Horas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Bombero</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Nombre Apellido Apellido"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Hora Entrada</Form.Label>
                  <Form.Control
                    type="time"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3"  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Hora Salida</Form.Label>
                  <Form.Control 
                    type="time" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <div className="enter-button-container">
                <Button variant="danger" onClick={handleClose}>
                  Ingresar
                </Button>
              </div>
            </Modal.Footer>
        </Modal>
      <div className="filter-button-container">
        <DropdownButton 
          as={ButtonGroup}
          title={
            <span>
              Filtrar &nbsp;<BiFilter /> 
            </span>
          }
          id="bg-vertical-dropdown-2"
          variant="secondary"
        >
       <Dropdown.Item eventKey="1">#</Dropdown.Item>
       <Dropdown.Item eventKey="2">Nombre</Dropdown.Item>
       <Dropdown.Item eventKey="3">Fecha</Dropdown.Item>
       <Dropdown.Item eventKey="4">Tiempo</Dropdown.Item>
       </DropdownButton>
     </div>
    </div>
     
  <div className="table-container">
     <thead>
        <tr>
         <th style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', color: 'black' }}> #</th>
         <th style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', color: 'black'}}>Bombero</th>
         <th style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', color: 'black' }}>Fecha</th>
         <th style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', color: 'black' }}>Entrada</th>
         <th style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', color: 'black' }}>Salida</th>
         <th style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', color: 'black' }}>Tiempo</th>
         <th style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', color: 'rgba(0,0,0,0)' }}>Modificar</th>
       </tr>
      </thead>
     <tbody>
        <tr>
          <td>10810</td>
          <td>Francisco Monsalve Pineda</td>
          <td>10-03-2023</td>
          <td>10:32:31</td>
          <td>13:32:31</td>
          <td> 3 </td>
          <td className="table-cell button-cell">
            <Button variant="primary" type='reset' size='sm'>
              <span>
                <AiFillEdit/> 
              </span>
            </Button>
          </td>
        </tr>
        <tr>
          <td>10010</td>
          <td>Guillermo Cortes Cereceda</td>
          <td>10-03-2023</td>
          <td>10:31:31</td>
          <td>13:31:31</td>
          <td>3</td> 
          <td><Button variant="primary" type='reset' size='sm'>
            <span>
              <AiFillEdit/> 
            </span>
           </Button>
          </td>
        </tr>
        <tr>
          <td>10800</td>
          <td>Valentina Suazo Espinoza</td>
          <td>10-03-2023</td>
          <td>10:30:31</td>
          <td>13:30:31</td>
          <td>3</td> 
          <td><Button variant="primary" type='reset' size='sm'>
            <span>
              <AiFillEdit/> 
            </span>
           </Button></td>
          </tr>
          <tr>
            <td>11800</td>
            <td>Rodrigo Suazo Espinoza</td>
            <td>10-03-2023</td>
            <td>10:30:31</td>
            <td>13:30:31</td>
            <td>3</td> 
            <td><Button variant="primary" type='reset' size='sm'>
              <span>
                <AiFillEdit/> 
              </span>
             </Button></td>
          </tr> 
          <tr>
            <td>10270</td>
            <td>Luciano Fernández Trigo</td>
            <td>10-03-2023</td>
            <td>10:28:31</td>
            <td>13:28:31</td>
            <td>3</td> 
            <td><Button variant="primary" type='reset' size='sm'>
              <span>
                <AiFillEdit/> 
              </span>
             </Button></td>
            </tr>
            <tr>
              <td>11120</td>
              <td>Cristóbal Fuentes Díaz</td>
              <td>10-03-2023</td>
              <td>10:27:31</td>
              <td>13:27:31</td>
              <td>3</td> 
              <td><Button variant="primary" type='reset' size='sm'>
                <span>
                  <AiFillEdit/> 
                </span>
               </Button>
              </td>
            </tr>
            <tr>
              <td>10010</td>
              <td>Guillermo Cortes Cereceda</td>
              <td>10-03-2023</td>
              <td>10:31:31</td>
              <td>13:31:31</td>
              <td>3</td> 
              <td><Button variant="primary" type='reset' size='sm'>
                <span>
                  <AiFillEdit/> 
                </span>
               </Button>
              </td>
            </tr>
            <tr>
              <td>10010</td>
              <td>Guillermo Cortes Cereceda</td>
              <td>10-03-2023</td>
              <td>10:31:31</td>
              <td>13:31:31</td>
              <td>3</td> 
              <td><Button variant="primary" type='reset' size='sm'>
                <span>
                  <AiFillEdit/> 
                </span>
               </Button>
              </td>
            </tr>
      </tbody>
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

export default RegistroHoras;
