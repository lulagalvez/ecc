import "../styles/NavBar.css";
import Logo from "../../image/shield-image.png";
import styled from "styled-components";

import { Link } from "react-router-dom";
import {
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { FaBell, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"; // Importa los íconos de FontAwesome

const CircleWithLetter = styled.div`
  background-color: red;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.25em;
  margin-left: 2em;
  padding: 1.25em;
`;

const CustomNavDropdown = styled(NavDropdown)`
  &&& .dropdown-toggle::after {
    display: none;
  }
`;

function CircleIcon({ letter }) {
  return <CircleWithLetter>{letter}</CircleWithLetter>;
}

const NavBar = ({ usuario }) => {
  return (
    <Navbar
      fluid
      as={Container}
      className="barra-navegacion"
      variant="dark"
      fixed="top"
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
    >
      <Navbar.Brand as={Link} to={"/menupage"}>
        <Image
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "100%", maxHeight: "%100%" }}
          className="logo-baner ms-4 me-4"
        ></Image>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto ms-4 menus">
          <Nav.Link className="me-2" as={Link} to="/bitacoras">
            Bitácora
          </Nav.Link>
          <Nav.Link className="me-2" as={Link} to="/registro-horas">
            Historial
          </Nav.Link>
          <Nav.Link className="me-2" as={Link} to="/registrar-usuario">
            Crear Usuario
          </Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Matricula"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Nav>
        <Nav>
          <NavDropdown
            title={<FaBell className="icono-notificaciones" />}
            id="collapsible-nav-dropdown"
            className="ms-4 me-4 mt-2"
          >
            <NavDropdown.Item href="#action/3.1" className="icono-con-texto">
              <FaBell style={{ marginRight: "0.5rem" }} /> Notificaciones
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2" className="icono-con-texto">
              <FaBell style={{ marginRight: "0.5rem" }} /> Notificación 1
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" className="icono-con-texto">
              <FaBell style={{ marginRight: "0.5rem" }} /> Notificación 2
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4" className="icono-con-texto">
              <FaBell style={{ marginRight: "0.5rem" }} /> Notificación 3
            </NavDropdown.Item>
          </NavDropdown>

          <CustomNavDropdown
            title={<CircleIcon letter="J" />}
            id="collapsible-nav-dropdown"
            className="me-5"
          >
            <NavDropdown.Item href="#action/3.1" className="icono-con-texto">
              <FaUser style={{ marginRight: "0.5rem" }} /> Jose Toledo
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.3" className="icono-con-texto">
              <FaCog style={{ marginRight: "0.5rem" }} /> Ajustes
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" className="icono-con-texto">
              <FaSignOutAlt style={{ marginRight: "0.5rem" }} />
              Cerrar sesión
            </NavDropdown.Item>
          </CustomNavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
