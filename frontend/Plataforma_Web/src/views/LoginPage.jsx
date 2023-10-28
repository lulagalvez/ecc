import "./style/LoginPage.css";

import { motion } from "framer-motion";

import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

import Logo from "../image/shield-image.png";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Ver tema de opacidad en transicion
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className="login-container">
        <Row className="justify-content-center align-items-center login-row flex-column ">
          <Col className="fila-1">
            <Image
              src={Logo}
              className="logo"
              alt="Logo"
              style={{ maxWidth: "25%" }}
            />
          </Col>
          <Col className="fila-2">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Numero de Bombero</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  No compartas esta información con nadie
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
            </Form>
          </Col>
          <Col className="fila-3">
            <Button variant="primary" type="submit">
              iniciar sesion
            </Button>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
