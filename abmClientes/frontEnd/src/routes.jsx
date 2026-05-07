
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./components/layouts/HomeLayout";
import PublicLayout from "./components/layouts/PublicLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./pages/landing/HomePage";
import Login from "./pages/auth/Login";
import Landing from "./pages/landing/Landing";
import Clientes from "./pages/Clientes";
import ClienteForm from "./pages/clientes/ClienteForm";
import VehiculosList from "./pages/vehiculos/VehiculosList";
import VehiculoForm from "./pages/vehiculos/VehiculoForm";
import AlquilerList from "./pages/alquileres/AlquilerList";
import AlquilerForm from "./pages/alquileres/AlquilerForm";
import Dashboard from "./pages/Dashboard";
import Error from "./lib/maps/Error";

const router = createBrowserRouter([
  // ── Public routes (no auth required) ──────────────────────────────
  {
    element: <HomeLayout />,
    errorElement: <Error type="error_desconocido" />,
    children: [
      { path: "/",       element: <HomePage /> },
      { path: "/login",  element: <Login /> },
    ],
  },

  // ── Admin routes (role: admin) ──────────────────────────────────
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <PublicLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error type="error_desconocido" />,
    children: [
      { index: true,                                element: <Dashboard /> },

      // Clientes
      { path: "clientes",                                element: <Landing /> },
      { path: "clientes/categoria/:buscarCategoria",      element: <Landing /> },
      { path: "clientes/nuevo",                          element: <ClienteForm /> },
      { path: "clientes/:id/editar",                     element: <ClienteForm /> },
      { path: "clientes/:id",                            element: <Clientes /> },

      // Vehículos
      { path: "vehiculos",                          element: <VehiculosList /> },
      { path: "vehiculos/nuevo",                    element: <VehiculoForm /> },
      { path: "vehiculos/:id/editar",               element: <VehiculoForm /> },

      // Alquileres
      { path: "alquileres",                         element: <AlquilerList /> },
      { path: "alquileres/nuevo",                   element: <AlquilerForm /> },
    ],
  },

  // ── 404 catch-all ─────────────────────────────────────────────────
  { path: "*", element: <Error type="not_found" /> },
]);

export default router;

