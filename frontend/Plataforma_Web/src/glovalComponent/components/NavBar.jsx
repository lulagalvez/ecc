import React from "react";
import "../styles/NavBar.css";
import Logo from "../../image/shield-image.png";
import styled from 'styled-components';
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importa los íconos de FontAwesome

const CircleWithLetter = styled.div`
  background-color: red;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.25vw;
  margin-left: 2vh;
  padding: 3vh;
`;

const CustomNavDropdown = styled(NavDropdown)`
  &&& .dropdown-toggle::after {
    display: none;
  }
`;

function CircleIcon({ letter }) {
  return (
    <CircleWithLetter>
      {letter}
    </CircleWithLetter>
  );
}

const NavBar = ({ usuario }) => {
  return (
    <Container fluid>
      <Navbar fluid as={Container} variant="dark" fixed="top" expand="md" bg="dark" data-bs-theme="dark" className="barra-navegacion">
        <Navbar.Brand href="#home" as={Image} src={Logo} alt="Logo" style={{ maxWidth: "100%" }} className="logo-baner ms-4 me-4" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-4 menus">
            <Nav.Link className="me-2" href="#features">Bitácora</Nav.Link>
            <Nav.Link href="#pricing">Historial</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={<FaBell className="icono-notificaciones" />} id="collapsible-nav-dropdown" className="ms-4 me-4" >
              <NavDropdown.Item href="#action/3.1" className="icono-con-texto">
                <FaBell style={{ marginRight: '0.5rem' }}/> Notificaciones
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2" className="icono-con-texto">
                <FaBell style={{ marginRight: '0.5rem' }}/> Notificación 1
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="icono-con-texto">
                <FaBell style={{ marginRight: '0.5rem' }}/> Notificación 2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" className="icono-con-texto">
                <FaBell style={{ marginRight: '0.5rem' }}/> Notificación 3
              </NavDropdown.Item>
            </NavDropdown>

            <CustomNavDropdown title={<CircleIcon letter="J" />} id="collapsible-nav-dropdown" className="me-5">
              <NavDropdown.Item href="#action/3.1" className="icono-con-texto">
                <FaUser style={{ marginRight: '0.5rem' }}/> Jose Toledo
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3" className="icono-con-texto">
                <FaCog  style={{ marginRight: '0.5rem' }} /> Ajustes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="icono-con-texto">
  <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
  Cerrar sesión
</NavDropdown.Item>
            </CustomNavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
