import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export default UserProvider;
