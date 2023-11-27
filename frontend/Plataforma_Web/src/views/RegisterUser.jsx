import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function RegisterUser() {
  const token = localStorage.getItem("access_token");

  const [userData, setUserData] = useState({
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "user",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        "http://perrera.inf.udec.cl:1522/user/register",
        {
          method: "POST",
          headers,
          body: JSON.stringify(userData),
        }
      );

      if (response.status === 201) {
        console.log("Usuario registrado exitosamente!");
      } else {
        const data = await response.json();
        console.error("Registro fallido:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo electronico:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Rol</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={userData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>

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

        <Button
          variant="outline-success"
          type="submit"
          className="d'flex  align-items-end"
        >
          Registrar
        </Button>
      </Form>
    </>
  );
}

export default RegisterUser;
