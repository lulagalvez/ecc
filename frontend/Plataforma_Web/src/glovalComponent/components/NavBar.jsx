

import "../styles/NavBar.css";

import { Container, Form, Button, Image,Nav,Navbar,Offcanvas,Row,Col} from "react-bootstrap";

import { RiLockPasswordLine } from "react-icons/ri";



 import Logo from "../../image/shield-image.png";


const NavBar = ({usuario,onOffcanvasShow,onOffcanvasClose,showOffcanvas}) => {
  return (

    <>
      <Container fluid>
      <Navbar  fluid  as={Container} variant="dark" fixed="top" expand="md" bg="dark" data-bs-theme="dark">
          <Navbar.Brand href="#home" as={Image} //Navbar.Brand se utiliza para representar la marca o el logotipo de la barra de navegación.
          src={Logo}
          className="logo"
          alt="Logo"
          style={{maxWidth: "100%"}}>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />



          <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="text-light">
          {usuario}
        </Navbar.Text>

        <Button variant="secondary" onClick={onOffcanvasShow}>
        <RiLockPasswordLine/>
        </Button>
      </Navbar.Collapse>


  
          


          <Offcanvas show={showOffcanvas} onHide={onOffcanvasClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Contenido del menú Offcanvas */}
          <p>Este es el contenido del menú Offcanvas.</p>
        </Offcanvas.Body>
      </Offcanvas>

      </Navbar>


   
      </Container>

    </>




    );
};

export default NavBar;