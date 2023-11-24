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
