import axios from "axios";

/**
 * Inicia sesión de un usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {object} - Datos del usuario después de iniciar sesión.
 */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "http://perrera.inf.udec.cl:1522/user/login",
      {
        user_name: email,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

/**
 * Obtiene información de un usuario por su ID.
 * @param {string} Id - ID del usuario.
 * @returns {object} - Datos del usuario.
 */
export const getUserById = async (Id) => {
  try {
    const response = await axios.get(
      `http://perrera.inf.udec.cl:1522/user/${Id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener informacion del usuario a traves del id ${Id}:`,
      error
    );
    throw error;
  }
};

/**
 * Obtiene todos los usuarios registrados.
 * @returns {array} - Lista de todos los usuarios.
 */
export const allUser = async () => {
  try {
    const response = await axios.get("http://perrera.inf.udec.cl:1522/user");
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios registrados:", error);
    throw error;
  }
};

/**
 * Obtiene la lista de usuarios para un estado específico.
 * @param {string} state - Estado para el cual se desea obtener usuarios.
 * @returns {array} - Lista de usuarios para el estado dado.
 */
export const getUsersByState = async (state) => {
  try {
    const response = await axios.get(
      `http://perrera.inf.udec.cl:1522/user/users_by_state/${state}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener la lista de usuarios para el estado ${state}:`,
      error
    );
    throw error;
  }
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {object} - Datos de confirmación de cierre de sesión.
 */
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      "http://perrera.inf.udec.cl:1522/user/logout"
    );
    return response.data;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

/**
 * Elimina un usuario por su ID.
 * @param {string} Id - ID del usuario a eliminar.
 * @returns {object} - Datos de confirmación de eliminación.
 */
export const deleteUser = async (Id) => {
  try {
    const response = await axios.delete(
      `http://perrera.inf.udec.cl:1522/user/${Id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

/**
 * Actualiza la información de un usuario por su ID.
 * @param {string} Id - ID del usuario a actualizar.
 * @param {object} updatedUserData - Datos actualizados del usuario.
 * @returns {object} - Datos de confirmación de actualización.
 */
export const updateUser = async (Id, updatedUserData) => {
  try {
    const response = await axios.patch(
      `http://perrera.inf.udec.cl:1522/user/${Id}`,
      updatedUserData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

/**
 * Verifica una ruta protegida, requiere un token de acceso en las cabeceras.
 * @returns {object} - Datos de la ruta protegida si la verificación es exitosa.
 */
export const checkProtectedRoute = async () => {
  try {
    const response = await axios.get(
      "http://perrera.inf.udec.cl:1522/user/protected-route",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al verificar la ruta protegida:", error);
    throw error;
  }
};
