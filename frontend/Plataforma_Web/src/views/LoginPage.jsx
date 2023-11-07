import "./style/LoginPage.css";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, Button, Image} from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Logo from "../image/shield-image.png";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Ver tema de opacidad en transicion
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container fluid className="background">


      <Container className="page-container ">
        <Row className="justify-content-center align-items-center flex-column login-row ">
          <Col md = {12} className="fila-1">
            <Image
              src={Logo}
              className="logo"
              alt="Logo"
              style={{ maxWidth: "100%" }}
            />
          </Col>

          <Col md={12} className="fila-2">
            <Form>
              <Form.Group className="mb-5 mt-5" controlId="formBasicEmail">
                <div className="user">
                <AiOutlineUserAdd className="icono"/>
                <Form.Control className="formulario-control" type="email" placeholder="Numero de bombero"/>
                </div>
              </Form.Group>


              <Form.Group className="password mb-5" controlId="formBasicPassword">
              <div className="user">
              <RiLockPasswordLine className="icono"/>
                <Form.Control className="formulario-control "type="password" placeholder="Contraseña" />
                </div>
              </Form.Group>        
            </Form>
          </Col>

          <Col md = {12} className="fila-3 ">
            <Button variant="dark" type="submit" size="lg" className="mb-2">
              iniciar sesion
            </Button>
          </Col>

        </Row>
      </Container>


      </Container>
    </motion.div>
  );
};

export default LoginPage;
