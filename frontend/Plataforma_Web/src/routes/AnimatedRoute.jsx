import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LoginPage from "../views/LoginPage";
import RegistroHoras from "../views/RegistroHoras"

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

  ]);

  return (
    <AnimatePresence>
      <Outlet />
      {routing}
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
