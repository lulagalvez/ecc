import { Table, Button, Modal } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import React, { useState } from "react";
import { deleteUser } from "../../functionsApi/UserApi";

function UserTable({ users, onIconClick }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteUser(userToDelete.id);
      console.log(`Usuario ${userToDelete.user_name} eliminado exitosamente`);
      // Puedes realizar otras acciones después de la eliminación, como actualizar la lista de usuarios
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      // Puedes manejar el error según tus necesidades
    } finally {
      handleCloseDeleteModal();
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Correo electronico</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Rol</th>
          <th>Usuario </th>
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
                variant="outline-danger"
                onClick={() => handleShowDeleteModal(user)}
              >
                <MdDeleteForever />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>

      {/* Modal para confirmar la eliminación */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar a {userToDelete?.user_name}?
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
