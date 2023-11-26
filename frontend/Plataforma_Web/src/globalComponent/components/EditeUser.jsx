import { Table, Button, Modal, Form } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import React, { useState } from "react";
import { deleteUser } from "../../functionsApi/UserApi";
import { useContext } from "react";
import { FcDataConfiguration } from "react-icons/fc";
import { updateUser } from "../../functionsApi/UserApi";

import UserContext from "../../UserContextApi/UserContext";

function UserTable({ users }) {
  const [showEditeModal, setShowEditeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    user_name: "",
    email: "",
    state: "",
  });

  const [userEdite, setUserToEdite] = useState(null);

  const { setChangue } = useContext(UserContext);

  const handleShowEditeModal = (user) => {
    setUserToEdite(user);
    setUpdatedUserData({
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      user_name: user.user_name,
      email: user.email,
      state: user.state,
    });
    setShowEditeModal(true);
  };

  const handleCloseEditeModal = () => {
    setUserToEdite(null);
    setShowEditeModal(false);
  };

  const handleShowDeleteModal = (user) => {
    setUserToEdite(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToEdite(null);
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      // Realiza la actualización del usuario en el servidor
      await updateUser(userEdite.id, updatedUserData);

      // Imprime por consola el mensaje de éxito
      console.log(`Usuario ${userEdite.user_name} actualizado exitosamente`);

      setChangue((prevValue) => !prevValue);

      handleCloseEditeModal();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      // Puedes manejar el error según tus necesidades
    }
  };
  const handleDeleteClick = async () => {
    try {
      await deleteUser(userEdite.id);
      console.log(`Usuario ${userEdite.user_name} eliminado exitosamente`);
      setChangue((prevValue) => !prevValue);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      // Puedes manejar el error según tus necesidades
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <Table striped hover size="md">
      <thead>
        <tr>
          <th>Correo electronico</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Rol</th>
          <th>Usuario </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.role}</td>
            <td>{user.user_name}</td>
            <td>
              <Button
                variant="outline-primary"
                onClick={() => handleShowEditeModal(user)}
              >
                <FcDataConfiguration />
              </Button>
            </td>

            <td>
              <Button
                variant="outline-danger"
                onClick={() => handleShowDeleteModal(user)}
              >
                <MdDeleteForever />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>

      {/* Modal para editar al usuario seleccionado */}
      <Modal
        show={showEditeModal}
        onHide={handleCloseEditeModal}
        centered
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder={updatedUserData.first_name}
                value={updatedUserData.first_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder={updatedUserData.last_name}
                value={updatedUserData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formUserName">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder={updatedUserData.user_name}
                value={updatedUserData.user_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={updatedUserData.email}
                value={updatedUserData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder={updatedUserData.state}
                value={updatedUserData.state}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={updatedUserData.role}
                onChange={handleChange}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateClick}>
            Actualizar usuario
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar la eliminación */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar a {userEdite?.user_name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Table>
  );
}

export default UserTable;
