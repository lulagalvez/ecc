import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { getUsersByState, allUser } from "../functionsApi/UserApi";

const UserProvider = ({ children }) => {
  const [radioValue, setRadioValue] = useState("5"); //deafult opcion de inactivos
  const [loadComplete, setLoadComplete] = useState(false); // para cargar , eliminar a fururo maybe

  const [allUsers, setAllUsers] = useState([]); //1
  const [activeUsers, setActiveUsers] = useState([]); //2
  const [emergencyUsers, setEmergencyUsers] = useState([]); //3
  const [driverUsers, setDriverUsers] = useState([]); //4
  const [inactiveUsers, setInactiveUsers] = useState([]); //5

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const allUserResponse = await allUser();
        isMounted && setAllUsers(allUserResponse);

        const inactiveResponse = await getUsersByState(0);
        isMounted && setInactiveUsers(inactiveResponse);

        const activeResponse = await getUsersByState(1);
        isMounted && setActiveUsers(activeResponse);

        const emergencyResponse = await getUsersByState(2);
        isMounted && setEmergencyUsers(emergencyResponse);

        const driverResponse = await getUsersByState(3);
        isMounted && setDriverUsers(driverResponse);
      } catch (error) {
        console.error(
          "Error al obtener la lista de bomberos por estado:",
          error
        );
      } finally {
        isMounted && setLoadComplete(true);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
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
        loadComplete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
