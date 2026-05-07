import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "@/lib/api/dashboard";
import {
  Car,
  Users,
  ClipboardList,
  DollarSign,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const MESES = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre",
];

function MetricCard({ icon: Icon, label, value, sub, iconClass, to }) {
  const content = (
    <div
      className={`luxury-card rounded-xl p-5 flex items-center gap-4 animate-fade-in-up ${
        to ? "cursor-pointer" : ""
      }`}
    >
      <div className={`p-3 rounded-lg shrink-0 ${iconClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-[#f0ede8] leading-none">{value}</p>
        <p className="text-[11px] font-semibold text-luxury-muted tracking-[0.12em] uppercase mt-1">{label}</p>
        {sub && <p className="text-[10px] text-[#555] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(() => setError("No se pudieron cargar las métricas."))
      .finally(() => setLoading(false));
  }, []);

  const mesActual = MESES[new Date().getMonth()];

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-48">
        <p className="text-luxury-muted animate-pulse tracking-widest text-sm uppercase">Cargando…</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-400">{error}</p>
      </div>
    );

  const {
    alquileresActivos,
    ingresosDelMes,
    alquileresDelMes,
    proximasVencidas,
    totalClientes,
    totalVehiculos,
    vehiculosDisponibles,
  } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#f0ede8]">Dashboard</h1>
        <div className="gold-line mt-3 mb-1 w-16" />
        <p className="text-luxury-muted text-sm tracking-wide mt-2">
          Resumen operativo actualizado
        </p>
      </div>

      {/* Alerta vencidos */}
      {proximasVencidas > 0 && (
        <Link to="/admin/alquileres?estado=activo">
          <div className="flex items-center gap-3 bg-amber-950/40 border border-amber-600/40 rounded-lg px-5 py-3.5 hover:border-amber-500/70 transition-all duration-200 animate-fade-in">
            <AlertTriangle className="text-amber-400 w-5 h-5 shrink-0" />
            <p className="text-sm font-medium text-amber-300">
              {proximasVencidas === 1
                ? "Hay 1 alquiler activo con devolución vencida o que vence hoy."
                : `Hay ${proximasVencidas} alquileres con devolución vencida o que vencen hoy.`}
            </p>
          </div>
        </Link>
      )}

      {/* Métricas de alquileres */}
      <div>
        <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-4">
          Alquileres
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            icon={ClipboardList}
            label="Activos ahora"
            value={alquileresActivos}
            sub="en curso"
            iconClass="bg-gold/15 text-gold [&>svg]:text-gold"
            to="/admin/alquileres?estado=activo"
          />
          <MetricCard
            icon={TrendingUp}
            label={`Nuevos en ${mesActual}`}
            value={alquileresDelMes}
            sub="registrados este mes"
            iconClass="bg-blue-500/15 [&>svg]:text-blue-400"
            to="/admin/alquileres"
          />
          <MetricCard
            icon={DollarSign}
            label={`Ingresos · ${mesActual}`}
            value={`$${ingresosDelMes.toLocaleString("es-AR", { minimumFractionDigits: 0 })}`}
            sub="alquileres finalizados"
            iconClass="bg-emerald-500/15 [&>svg]:text-emerald-400"
          />
        </div>
      </div>

      {/* Flota y clientes */}
      <div>
        <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-4">
          Flota y Clientes
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Users}
            label="Clientes"
            value={totalClientes}
            iconClass="bg-violet-500/15 [&>svg]:text-violet-400"
            to="/admin/clientes"
          />
          <MetricCard
            icon={Car}
            label="Vehículos"
            value={totalVehiculos}
            iconClass="bg-[#333] [&>svg]:text-luxury-muted"
            to="/admin/vehiculos"
          />
          <MetricCard
            icon={Car}
            label="Disponibles"
            value={vehiculosDisponibles}
            sub="sin alquiler activo"
            iconClass="bg-teal-500/15 [&>svg]:text-teal-400"
            to="/admin/vehiculos?disponibles=true"
          />
          <MetricCard
            icon={Car}
            label="En alquiler"
            value={totalVehiculos - vehiculosDisponibles}
            sub="con alquiler activo"
            iconClass="bg-orange-500/15 [&>svg]:text-orange-400"
            to="/admin/alquileres?estado=activo"
          />
        </div>
      </div>

      {/* Acciones rápidas */}
      <div>
        <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-4">
          Acciones rápidas
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { to: "/alquileres/nuevo", label: "+ Nuevo alquiler", primary: true },
            { to: "/clientes/nuevo",   label: "+ Nuevo cliente" },
            { to: "/vehiculos/nuevo",  label: "+ Nuevo vehículo" },
            { to: "/alquileres?estado=activo", label: "Ver activos" },
          ].map(({ to, label, primary }) => (
            <Link
              key={to}
              to={to}
              className={`px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase rounded-sm transition-all duration-200 ${
                primary
                  ? "bg-gold text-luxury hover:bg-gold-light"
                  : "border border-gold/30 text-gold/70 hover:border-gold hover:text-gold"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

