
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const NAV = [
  { to: "/admin",            label: "Dashboard"  },
  { to: "/admin/clientes",   label: "Clientes"   },
  { to: "/admin/vehiculos",  label: "Vehículos"  },
  { to: "/admin/alquileres", label: "Alquileres" },
];

export default function Hero() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-luxury/95 backdrop-blur-md border-b border-gold-muted">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link to="/admin" className="group flex flex-col leading-none gap-0.5">
          <span className="gold-text text-lg font-bold tracking-[0.22em] uppercase">
            AutoPremium
          </span>
          <span className="text-[10px] text-luxury-muted tracking-[0.4em] uppercase">
            Luxury Car Rental
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV.map((n) => {
            const isActive =
              pathname === n.to ||
              (n.to !== "/admin" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-200 border-b-2 ${
                  isActive
                    ? "text-gold border-gold"
                    : "text-luxury-muted border-transparent hover:text-[#f0ede8] hover:border-gold/40"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          <Link
            to="/admin/clientes/nuevo"
            className="ml-4 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase border border-gold text-gold hover:bg-gold hover:text-luxury rounded-sm transition-all duration-200"
          >
            + Cliente
          </Link>

          {/* User + logout */}
          <div className="ml-4 flex items-center gap-2 pl-4 border-l border-gold/15">
            {user && (
              <span className="text-[10px] text-luxury-muted tracking-[0.14em] uppercase hidden sm:block">
                {user.username}
              </span>
            )}
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="p-2 text-luxury-muted hover:text-red-400 transition-colors rounded-sm"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}