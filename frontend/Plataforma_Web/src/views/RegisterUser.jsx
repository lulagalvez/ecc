import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";

import UserContext from "../UserContextApi/UserContext";

/**
 * Componente que representa el formulario de registro de usuarios.
 * @returns {JSX.Element} Elemento JSX del componente RegisterUser.
 */
function RegisterUser({ handleClose }) {
  const { actualizarDatos } = useContext(UserContext);

  // Obtiene el token de acceso almacenado en el localStorage
  const token = localStorage.getItem("access_token");

  // Estado para almacenar los datos del nuevo usuario
  const [userData, setUserData] = useState({
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "user",
    password: "",
  });

  /**
   * Maneja el envío del formulario de registro.
   * @param {Event} e - Evento de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Define las cabeceras para la solicitud HTTP
      const headers = {
        "Content-Type": "application/json",
      };

      // Agrega el token de autorización si está disponible
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Realiza la solicitud HTTP para registrar al nuevo usuario
      const response = await fetch(
        "http://perrera.inf.udec.cl:1522/user/register",
        {
          method: "POST",
          headers,
          body: JSON.stringify(userData),
        }
      );

      // Verifica el código de estado de la respuesta
      if (response.status === 201) {
        console.log("Usuario registrado exitosamente!");
        handleClose();
        actualizarDatos();
      } else {
        // Muestra un mensaje de error si el registro falla
        const data = await response.json();
        console.error("Registro fallido:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Maneja el cambio en los campos de entrada del formulario.
   * @param {Event} e - Evento de cambio en el campo de entrada.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el estado con los nuevos datos del formulario
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* Campo de entrada para el nombre de usuario */}
        <Form.Group className="mb-3" controlId="user_name">
          <Form.Label>Usuario:</Form.Label>
          <Form.Control
            type="text"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Campo de entrada para el correo electrónico */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo electrónico:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Campo de entrada para el nombre */}
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Campo de entrada para el apellido */}
        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Apellido:</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Campo de selección para el rol del usuario */}
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Rol:</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={userData.role}
            onChange={handleChange}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </Form.Control>
        </Form.Group>

        {/* Campo de entrada para la contraseña */}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Botón de registro */}
        <Button
          variant="outline-success"
          type="submit"
          className="d-flex align-items-end"
        >
          Registrar
        </Button>
      </Form>
    </>
  );
}

export default RegisterUser;
