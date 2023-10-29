

import "../styles/NavBar.css";

import { Container, Row, Col, Form, Button, Image,Nav,Navbar} from "react-bootstrap";



// import Logo from "../../image/shield-image.png";


const NavBar = () => {
  return (

    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#home">
          </Navbar.Brand>
          

        </Container>
      </Navbar>
    </>


    );
};

export default NavBar;