import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { getUsersByState, allUser } from "../functionsApi/UserApi";
import { GiChaingun } from "react-icons/gi";

/**
 * Componente proveedor que utiliza el contexto de usuario para proporcionar datos de usuarios a componentes secundarios.
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Elementos secundarios encapsulados por el proveedor.
 * @returns {JSX.Element} - Elemento JSX del proveedor de contexto de usuario.
 */
const UserProvider = ({ children }) => {
  // Estado para el valor del radio que determina el estado de los usuarios
  const [radioValue, setRadioValue] = useState("1"); // Opción por defecto de inactivos

  // Estados para almacenar listas de usuarios según su estado
  const [allUsers, setAllUsers] = useState([]); // Todos los usuarios (1)
  const [activeUsers, setActiveUsers] = useState([]); // Usuarios activos (2)
  const [emergencyUsers, setEmergencyUsers] = useState([]); // Usuarios en emergencia (3)
  const [driverUsers, setDriverUsers] = useState([]); // Usuarios conductores (4)
  const [inactiveUsers, setInactiveUsers] = useState([]); // Usuarios inactivos (5)
  const [change, setChange] = useState(false);

  // Efecto que se ejecuta al montar y desmontar el componente
  useEffect(() => {
    // Función asincrónica para obtener datos de usuarios
    const fetchData = async () => {
      try {
        // Obtener todos los usuarios
        const allUserResponse = await allUser();
        setAllUsers(allUserResponse);

        // Obtener usuarios inactivos
        const inactiveResponse = await getUsersByState(0);
        setInactiveUsers(inactiveResponse);

        // Obtener usuarios activos
        const activeResponse = await getUsersByState(1);
        setActiveUsers(activeResponse);

        // Obtener usuarios en emergencia
        const emergencyResponse = await getUsersByState(2);
        setEmergencyUsers(emergencyResponse);

        // Obtener usuarios conductores
        const driverResponse = await getUsersByState(3);
        setDriverUsers(driverResponse);
      } catch (error) {
        console.error(
          "Error al obtener la lista de usuarios por estado:",
          error
        );
      } finally {
        // Log de información sobre los datos actualizados
        console.log("Se han actualizado los datos :D");
        console.log("Todos los usuarios:", allUsers);
        console.log("Usuarios inactivos:", inactiveUsers);
        console.log("Usuarios activos:", activeUsers);
        console.log("Usuarios en emergencia:", emergencyUsers);
        console.log("Usuarios conductores:", driverUsers);
      }
    };

    // Llamar a la función para obtener datos
    fetchData();

    // La función de limpieza no tiene lógica en este caso
    return () => {};
  }, [change]); // Se ejecuta cuando 'change' cambia

  const actualizarDatos = () => {
    setChange((change) => !change);
    console.log(change);
  };

  return (
    <UserContext.Provider
      value={{
        radioValue,
        setRadioValue,
        actualizarDatos,
        allUsers,
        activeUsers,
        emergencyUsers,
        driverUsers,
        inactiveUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
