import { useRoutes, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LoginPage from "../views/LoginPage";
import RegistroHoras from "../views/HoursRecord";
import MenuPage from "../views/MenuPage";
import Support from "../views/Support";
import HowWork from "../views/HowWork";

function AnimatedRoutes() {
  //  Agregar rutas privadas , segun previa verificacion

  const routing = useRoutes([
    // Agregar rutas publicas
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/registro-horas" /*falta esta por agregar*/,
      element: <RegistroHoras />,
    },
    {
      path: "/menupage",
      element: <MenuPage />,
    },
    {
      path: "/How-Work",
      element: <HowWork />,
    },
    {
      path: "/Support",
      element: <Support />,
    },
  ]);

  return (
    <AnimatePresence>
      {/* Puedes agregar cualquier otro contenido que necesites antes de Outlet y routing */}
      <>
        <Outlet />
        {routing}
      </>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
