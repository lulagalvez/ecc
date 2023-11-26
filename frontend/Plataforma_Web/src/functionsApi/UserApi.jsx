import axios from "axios";

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

export const allUser = async () => {
  try {
    const response = await axios.get("http://perrera.inf.udec.cl:1522/user");
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios registrados:", error);
    throw error;
  }
};

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
