import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { getUsersByState, allUser } from "../functionsApi/UserApi";

const UserProvider = ({ children }) => {
  const [radioValue, setRadioValue] = useState("5"); //deafult opcion de inactivos

  const [allUsers, setAllUsers] = useState([]); //1
  const [activeUsers, setActiveUsers] = useState([]); //2
  const [emergencyUsers, setEmergencyUsers] = useState([]); //3
  const [driverUsers, setDriverUsers] = useState([]); //4
  const [inactiveUsers, setInactiveUsers] = useState([]); //5

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUserResponse = await allUser();
        setAllUsers(allUserResponse);

        const inactiveResponse = await getUsersByState(0);
        setInactiveUsers(inactiveResponse);

        const activeResponse = await getUsersByState(1);
        setActiveUsers(activeResponse);

        const emergencyResponse = await getUsersByState(2);
        setEmergencyUsers(emergencyResponse);

        const driverResponse = await getUsersByState(3);
        setDriverUsers(driverResponse);
      } catch (error) {
        console.error(
          "Error al obtener la lista de bomberos por estado:",
          error
        );
      } finally {
        console.log("Todos los usuarios", allUsers);
        console.log("Usuarios inactivos: ", inactiveUsers);
        console.log("Usuarios activos: ", activeUsers);
        console.log("Usuarios en emergencia: ", emergencyUsers);
        console.log("Usuarios conductores: ", driverUsers);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <UserContext.Provider
      value={{
        radioValue,
        setRadioValue,
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
