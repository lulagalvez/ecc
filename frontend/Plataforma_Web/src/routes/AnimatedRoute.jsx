import { useRoutes, Outlet, Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { checkProtectedRoute } from "../functionsApi/UserApi";
import { useEffect } from "react";

import LoginPage from "../views/LoginPage";
import HoursrRecord from "../views/HoursrRecord";
import MenuPage from "../views/MenuPage";
import Support from "../views/Support";
import HowWork from "../views/HowWork";

function AnimatedRoutes() {
  const isAuthenticated = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyProtectedRoute = async () => {
      try {
        await checkProtectedRoute();
        console.log("Acceso a ruta protegida");
      } catch (error) {
        console.error("Error al verificar la ruta protegida:", error);
        // Redirigir a menupage si hay un error de verificación y el usuario está autenticado
        isAuthenticated && navigate("/menupage", { replace: true });
      }
    };

    // Verificar solo si el usuario está autenticado
    if (isAuthenticated) {
      verifyProtectedRoute();
    }
  }, [isAuthenticated, navigate]);

  const routing = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/menupage" replace />
      ) : (
        <LoginPage />
      ),
    },
    {
      path: "/registro-horas",
      element: isAuthenticated ? <HoursrRecord /> : <Navigate to="/" />,
    },
    {
      path: "/menupage",
      element: isAuthenticated ? <MenuPage /> : <Navigate to="/" />,
    },
    {
      path: "/How-Work",
      element: isAuthenticated ? <HowWork /> : <Navigate to="/" />,
    },
    {
      path: "/Support",
      element: isAuthenticated ? <Support /> : <Navigate to="/" />,
    },
  ]);

  return (
    <AnimatePresence>
      <>
        <Outlet />
        {routing}
      </>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
