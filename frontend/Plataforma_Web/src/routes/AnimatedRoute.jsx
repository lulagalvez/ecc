import { useRoutes, Outlet, Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { checkProtectedRoute } from "../functionsApi/UserApi";
import { useEffect } from "react";

import LoginPage from "../views/LoginPage";
import HoursrRecord from "../views/HoursrRecord";
import MenuPage from "../views/MenuPage";
import Support from "../views/Support";
import HowWork from "../views/HowWork";
import BinnacleRecord from "../views/BinnacleRecord";

/**
 * Componente que gestiona las rutas animadas con Framer Motion y controla el acceso a rutas protegidas.
 * @returns {JSX.Element} Elemento JSX del componente de rutas animadas.
 */
function AnimatedRoutes() {
  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  // Efecto para verificar el acceso a rutas protegidas al cargar el componente
  useEffect(() => {
    const verifyProtectedRoute = async () => {
      try {
        // Verificar la ruta protegida
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

  // Definición de rutas
  const routing = useRoutes([
    {
      path: "/",
      // Redirigir a menupage si el usuario está autenticado, de lo contrario, mostrar la página de inicio de sesión
      element: isAuthenticated ? (
        <Navigate to="/menupage" replace />
      ) : (
        <LoginPage />
      ),
    },
    {
      path: "/registro-horas",
      // Mostrar la página de registro de horas si el usuario está autenticado, de lo contrario, redirigir a la página de inicio de sesión
      element: isAuthenticated ? <HoursrRecord /> : <Navigate to="/" />,
    },
    {
      path: "/menupage",
      // Mostrar la página de menú si el usuario está autenticado, de lo contrario, redirigir a la página de inicio de sesión
      element: isAuthenticated ? <MenuPage /> : <Navigate to="/" />,
    },
    {
      path: "/How-Work",
      // Mostrar la página "Cómo funciona" si el usuario está autenticado, de lo contrario, redirigir a la página de inicio de sesión
      element: isAuthenticated ? <HowWork /> : <Navigate to="/" />,
    },
    {
      path: "/Support",
      // Mostrar la página de soporte si el usuario está autenticado, de lo contrario, redirigir a la página de inicio de sesión
      element: isAuthenticated ? <Support /> : <Navigate to="/" />,
    },
    {
      path: "/record-binnacle",
      // Mostrar la página de registro de bitácora si el usuario está autenticado, de lo contrario, redirigir a la página de inicio de sesión
      element: isAuthenticated ? <BinnacleRecord /> : <Navigate to="/" />,
    },
  ]);

  return (
    <AnimatePresence>
      <>
        {/* Outlet para anidar rutas secundarias */}
        <Outlet />
        {/* Renderizar las rutas definidas */}
        {routing}
      </>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
