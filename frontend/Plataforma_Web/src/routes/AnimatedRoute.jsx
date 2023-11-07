import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LoginPage from "../views/LoginPage";
import RegistroHoras from "../views/RegistroHoras"
import MenuPage from "../views/MenuPage";
import RegisterUser from "../views/RegisterUser";
import LogPage from "../views/LogPage";

function AnimatedRoutes() {
  //  Agregar rutas privadas , segun previa verificacion

  const routing = useRoutes([
    // Agregar rutas publicas
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/registro-horas",
      element: <RegistroHoras />,
    },
    {
      path: "/menupage",
      element: <MenuPage/>
    },
    {
      path: "/registrar-usuario",
      element: <RegisterUser/>
    },
    {
      path: "/bitacoras",
      element: <LogPage/>
    },

  ]);

  return (
    <AnimatePresence>
      <Outlet />
      {routing}
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
