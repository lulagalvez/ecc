import "./style/LoginPage.css";
import { motion, useAnimation } from "framer-motion";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { loginUser } from "../functionsApi/UserApi";
import { CiLogin } from "react-icons/ci";
import { useEffect } from "react";
import Logo from "../image/shield-image.png";
import Logo2 from "../../../Plataforma_Web/ficon.png";

/**
 * Página de inicio de sesión con formulario para ingresar credenciales de usuario.
 * @returns {JSX.Element} Elemento JSX de la página de inicio de sesión.
 */
const LoginPage = () => {
  // Estado para almacenar los datos del formulario de inicio de sesión
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Estado para manejar el mensaje y el color del Alert
  const [alertInfo, setAlertInfo] = useState({
    message: "Por favor ingrese sus credenciales para acceder al sistema.",
    variant: "info", // color de fondo por defecto
  });

  // Función para la navegación entre páginas
  const navigate = useNavigate();

  /**
   * Función para manejar el evento de inicio de sesión.
   * @param {Event} event - Evento del formulario.
   */
  const logMeIn = async (event) => {
    try {
      // Llama a la función de inicio de sesión con las credenciales

      console.log(loginForm);
      const response = await loginUser(loginForm.email, loginForm.password);

      // Extrae el token de acceso de la respuesta
      const { access_token } = response;

      // Guarda el token en el localStorage
      localStorage.setItem("access_token", access_token);

      // Redirige a la página del menú
      navigate("/menupage", { replace: true });
    } catch (error) {
      // Maneja los errores de inicio de sesión
      if (error.response) {
        console.error(error.response);
        console.error(error.response.status);
        console.error(error.response.headers);
      }

      // Actualiza el estado del Alert en caso de error
      setAlertInfo({
        message:
          "Error al iniciar sesión. Por favor, verifique sus credenciales.",
        variant: "danger", // color de fondo rojo
      });
    }

    // Reinicia el estado del formulario después del envío
    setLoginForm({
      email: "",
      password: "",
    });

    // Evita el comportamiento predeterminado del formulario
    event.preventDefault();
  };

  /**
   * Función para manejar los cambios en los campos del formulario.
   * @param {Event} event - Evento del campo de formulario.
   */
  function handleChange(event) {
    // Extrae el valor y el nombre del campo del evento
    const { value, name } = event.target;

    // Actualiza el estado del formulario con el nuevo valor
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, rotateY: 0 });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container
        fluid
        className="bg-secondary bg-gradient"
        style={{ "--bs-bg-opacity": "0.6" }}
      >
        <Row>
          <Col className="vh-100  d-flex align-items-center justify-content-center">
            <motion.div
              initial={{ opacity: 0, rotateY: 180 }}
              animate={controls}
              transition={{ duration: 1.2, ease: "easeInOut" }} // Ajusta la duración y el tipo de easing
            >
              <div className="fs-1 mb-3 d-flex align-items-center justify-content-start">
                <Image
                  className="mx-2 mt-2"
                  alt="Logo"
                  style={{ width: "25px" }}
                  src={Logo2}
                />
                <p className="mb-0">
                  <span className="fw-bold text-danger">Regis</span>
                  <span className="fw-bold text-primary">Fire</span>
                </p>
              </div>
              <Card
                className="shadow-lg  "
                border="secondary"
                style={{ width: "30rem" }}
              >
                <Card.Header
                  className="bg-secondary  text-center fs-3 text-white "
                  style={{ "--bs-bg-opacity": "1" }}
                >
                  <CiLogin className="text-start mx-2  " />
                  Ingreso al sistema
                </Card.Header>
                <Card.Body className="text-center p-0 ">
                  <Card.Title className="mb-5 text-start  ">
                    <Alert
                      variant={alertInfo.variant}
                      className="text-muted fs-6"
                    >
                      {alertInfo.message}
                    </Alert>
                  </Card.Title>
                  <Card.Text>
                    <Form>
                      <Form.Group
                        controlId="formBasicEmail"
                        className=" mb-3 p-2"
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <AiOutlineUserAdd className="mx-2" />
                          <Form.Control
                            type="email"
                            size="md"
                            placeholder="Nombre de usuario"
                            value={loginForm.email} // Vincula el valor al estado
                            name="email" // Agrega el atributo name
                            onChange={handleChange} // Agrega el controlador de cambio
                            style={{ width: "350px" }} // Ajusta el valor según tus necesidades
                          />
                        </div>
                      </Form.Group>

                      <Form.Group
                        controlId="formBasicPassword"
                        className=" mt-3 p-2"
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <RiLockPasswordLine className="mx-2" />
                          <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            value={loginForm.password} // Vincula el valor al estado
                            name="password" // Agrega el atributo name
                            onChange={handleChange} // Agrega el controlador de cambio
                            style={{ width: "350px" }} // Ajusta el valor según tus necesidades
                          />
                        </div>
                      </Form.Group>

                      {/* Botón de inicio de sesión */}
                      <Button
                        variant="danger"
                        type="submit"
                        size="md"
                        onClick={logMeIn}
                        className="p-2  my-4 px-3 "
                      >
                        Iniciar Sesión
                      </Button>
                    </Form>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted d-flex p-3">
                  ¿Olvido su contraseña de administrador?
                </Card.Footer>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
