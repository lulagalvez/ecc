import "../styles/NavBar.css";

import Logo from "../../image/shield-image.png";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import OffCanvas from "./OffCanvas";

import { getUserById, logoutUser } from "../../functionsApi/UserApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContextApi/UserContext";
import { Image, Nav, Navbar, NavDropdown, Form, Button } from "react-bootstrap";
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

const NavBar = () => {
  const [userData, setUserData] = useState(null);
  const [loadComplete, setLoadComplete] = useState(false);

  const { radioValue, setRadioValue } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("El token es :", decodedToken); // token del usuario

      let Id = decodedToken.sub;
      let isMounted = true;

      /*
    exp: El tiempo de expiración del token.
    fresh: Un indicador de si el token es fresco o no.
    iat: La marca de tiempo en la que el token fue emitido.
    jti: Un identificador único para el token.
    nbf: Tiempo antes del cual el token no debe considerarse válido.
    sub: El sujeto del token, que parece ser el identificador del usuario.
    type: El tipo de token.
*/

      // Realiza la solicitud HTTP para obtener los detalles del usuario
      // Variable para indicar si la carga ha finalizado

      const fetchData = async () => {
        try {
          const dataUser = await getUserById(Id);
          isMounted && setUserData(dataUser);
        } catch (error) {
          console.error(
            "Error al obtener la lista de bomberos por estado:",
            error
          );
        } finally {
          // Cuando la carga ha finalizado, actualiza el estado de carga
          isMounted && setLoadComplete(true);
        }
      };

      fetchData();

      return () => {
        isMounted = false;
      };
    }

    // Se ejecuta solo al montar el componente
  }, []);

  // Este useEffect se ejecutará una vez que la carga ha finalizado
  useEffect(() => {
    if (loadComplete) {
      console.log("Informacion del administrador ", userData);
    }

    // Limpia la variable al desmontar el componente
    return () => {
      // Restablece loadComplete al desmontar
      setLoadComplete(false);
    };
  }, [loadComplete]);

  const firstLetter = userData?.user_name?.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      // Llama a la función de logout
      await logoutUser();

      // Elimina el token del almacenamiento local
      localStorage.removeItem("access_token");

      console.log(
        "Información del usuario después de cerrar sesión:",
        userData
      );

      // Redirigir a la página del menú
      navigate("/menupage", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };

  const navegarComofunciona = () => {
    setRadioValue("1");
    navigate("/How-Work", { replace: true });
  };

  const navegarSoporte = () => {
    setRadioValue("1");
    navigate("/Support", { replace: true });
  };

  return (
    <Navbar variant="dark" fixed="top" bg="dark" data-bs-theme="dark" expand>
      <Navbar.Brand className="ms-3">
        <OffCanvas></OffCanvas>
        <Image src={Logo} alt="Logo" className="logo-baner ms-5 "></Image>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto ms-4 menus">
          <Nav.Link className="me-2" onClick={navegarComofunciona}>
            ¿Cómo funciona?
          </Nav.Link>
          <Nav.Link className="me-2" onClick={navegarSoporte}>
            Soporte
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
            title={<CircleIcon letter={firstLetter} />}
            id="collapsible-nav-dropdown"
            className="me-5"
          >
            <NavDropdown.Item href="#action/3.1" className="icono-con-texto">
              <FaUser style={{ marginRight: "0.5rem" }} />{" "}
              {userData?.first_name}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.3" className="icono-con-texto">
              <FaCog style={{ marginRight: "0.5rem" }} /> Ajustes
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={handleLogout}
              className="icono-con-texto"
            >
              <FaSignOutAlt style={{ marginRight: "0.5rem" }} />
              Cerrar sesión
            </NavDropdown.Item>
          </CustomNavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default React.memo(NavBar);
