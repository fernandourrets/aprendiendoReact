import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getClienteById, eliminarCliente } from "@/lib/api/clientes";
import { getAlquileres } from "@/lib/api/alquileres";

const estadoBadge = {
  activo:    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  finalizado:"bg-[#222] text-luxury-muted border border-gold/10",
  cancelado: "bg-red-500/10 text-red-400 border border-red-500/25",
};

export default function Clientes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getClienteById(id), getAlquileres()])
      .then(([cli, alqs]) => {
        setCliente(cli);
        setAlquileres(alqs.filter((a) => a.clienteId === Number(id)));
      })
      .catch(() => setError("No se pudo cargar el cliente."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEliminar = async () => {
    if (!confirm(`¿Eliminar a ${cliente.nombre} ${cliente.apellido}?`)) return;
    const res = await eliminarCliente(id);
    if (res.error) {
      alert("No se puede eliminar: tiene alquileres activos.");
      return;
    }
    navigate("/admin/clientes");
  };

  if (loading) return <p className="p-8 text-luxury-muted animate-pulse tracking-widest text-sm uppercase">Cargando…</p>;
  if (error) return <p className="p-8 text-red-400">{error}</p>;
  if (!cliente) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] text-luxury-muted tracking-[0.25em] uppercase mb-1">Perfil de cliente</p>
          <h1 className="text-3xl font-bold tracking-tight text-[#f0ede8]">
            {cliente.nombre} {cliente.apellido}
          </h1>
          <div className="gold-line w-12 mt-2 mb-1" />
          <p className="text-luxury-muted text-sm">DNI {cliente.dni}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            to={`/admin/clientes/${id}/editar`}
            className="px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
          >
            Editar
          </Link>
          <button
            onClick={handleEliminar}
            className="px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase border border-red-800/40 text-red-400/70 hover:border-red-500 hover:text-red-400 rounded-sm transition-all duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Datos */}
      <div className="luxury-card rounded-xl p-6 grid grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] text-luxury-muted tracking-[0.2em] uppercase mb-1">Email</p>
          <p className="text-[#f0ede8] text-sm">{cliente.email || "—"}</p>
        </div>
        <div>
          <p className="text-[10px] text-luxury-muted tracking-[0.2em] uppercase mb-1">Celular</p>
          <p className="text-[#f0ede8] text-sm">{cliente.celular || "—"}</p>
        </div>
      </div>

      {/* Vehículos */}
      <div>
        <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-3">Vehículos asociados</p>
        {cliente.vehiculos && cliente.vehiculos.length > 0 ? (
          <div className="space-y-2">
            {cliente.vehiculos.map((v) => (
              <div key={v.id} className="luxury-card rounded-lg px-5 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-[#f0ede8]">
                  {v.modelo?.marca?.marcaVehiculo} {v.modelo?.modeloVehiculo} ({v.año})
                </span>
                <span className="text-xs text-luxury-muted tracking-wider">{v.patente}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-luxury-muted text-sm">Sin vehículos registrados.</p>
        )}
      </div>

      {/* Alquileres */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase">Alquileres</p>
          <Link
            to={`/admin/alquileres/nuevo?clienteId=${id}`}
            className="text-xs text-gold/70 hover:text-gold transition-colors tracking-wide"
          >
            + Nuevo alquiler
          </Link>
        </div>
        {alquileres.length > 0 ? (
          <div className="space-y-2">
            {alquileres.map((a) => (
              <div key={a.id} className="luxury-card rounded-lg px-5 py-3.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#f0ede8]">
                    {a.vehiculo?.modelo?.marca?.marcaVehiculo} {a.vehiculo?.modelo?.modeloVehiculo}
                    {" · "}
                    {new Date(a.fechaInicio).toLocaleDateString("es-AR")} — {new Date(a.fechaFinPrevista).toLocaleDateString("es-AR")}
                  </p>
                  <p className="text-xs text-luxury-muted mt-0.5">
                    ${a.precioPorDia}/día{a.totalCalculado ? ` · Total: $${a.totalCalculado}` : ""}
                  </p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-sm font-semibold tracking-wide ${estadoBadge[a.estado]}`}>
                  {a.estado}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-luxury-muted text-sm">Sin alquileres registrados.</p>
        )}
      </div>

      <Link to="/admin/clientes" className="text-xs text-luxury-muted hover:text-gold transition-colors tracking-wide">← Volver al listado</Link>
    </div>
  );
}
