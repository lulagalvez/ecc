import "./style/LoginPage.css";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { loginUser } from "../functionsApi/UserApi";
import Logo from "../image/shield-image.png";

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

  // Función para la navegación entre páginas
  const navigate = useNavigate();

  /**
   * Función para manejar el evento de inicio de sesión.
   * @param {Event} event - Evento del formulario.
   */
  const logMeIn = async (event) => {
    try {
      // Llama a la función de inicio de sesión con las credenciales
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

  return (
    <motion.div
      initial={{ opacity: 0 }} // Transición de opacidad al cargar la página
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Contenedor principal */}
      <Container fluid className="background">
        <Container className="page-container">
          {/* Fila central con el logotipo y el formulario */}
          <Row className="justify-content-center align-items-center flex-column login-row">
            {/* Logotipo */}
            <Col md={12} className="fila-1">
              <Image
                src={Logo}
                className="logo"
                alt="Logo"
                style={{ maxWidth: "100%" }}
              />
            </Col>

            {/* Formulario de inicio de sesión */}
            <Col md={12} className="fila-2">
              <Form>
                {/* Campo de número de bombero */}
                <Form.Group className="mb-5 mt-5" controlId="formBasicEmail">
                  <div className="user">
                    <AiOutlineUserAdd className="icono" />
                    <Form.Control
                      className="formulario-control"
                      type="email"
                      placeholder="Número de bombero"
                      value={loginForm.email} // Vincula el valor al estado
                      name="email" // Agrega el atributo name
                      onChange={handleChange} // Agrega el controlador de cambio
                    />
                  </div>
                </Form.Group>

                {/* Campo de contraseña */}
                <Form.Group
                  className="password mb-5"
                  controlId="formBasicPassword"
                >
                  <div className="user">
                    <RiLockPasswordLine className="icono" />
                    <Form.Control
                      className="formulario-control"
                      type="password"
                      placeholder="Contraseña"
                      value={loginForm.password} // Vincula el valor al estado
                      name="password" // Agrega el atributo name
                      onChange={handleChange} // Agrega el controlador de cambio
                    />
                  </div>
                </Form.Group>

                {/* Botón de inicio de sesión */}
                <Button
                  variant="dark"
                  type="submit"
                  size="lg"
                  className="mb-2"
                  onClick={logMeIn}
                >
                  Iniciar Sesión
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
