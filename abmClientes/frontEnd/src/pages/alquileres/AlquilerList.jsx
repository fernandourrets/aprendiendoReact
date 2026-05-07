import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  getAlquileres,
  devolverAlquiler,
  cancelarAlquiler,
  eliminarAlquiler,
} from "@/lib/api/alquileres";

const ESTADOS = [
  { value: "", label: "Todos" },
  { value: "activo", label: "Activos" },
  { value: "finalizado", label: "Finalizados" },
  { value: "cancelado", label: "Cancelados" },
];

const estadoBadge = {
  activo:    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  finalizado:"bg-[#222] text-luxury-muted border border-gold/10",
  cancelado: "bg-red-500/10 text-red-400 border border-red-500/25",
};

export default function AlquilerList() {
  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const filtroEstado = searchParams.get("estado") || "";
  const [devolviendo, setDevolviendo] = useState(null);
  const [fechaDev, setFechaDev] = useState("");
  const navigate = useNavigate();

  const cargar = (estado) => {
    setLoading(true);
    getAlquileres(estado || undefined)
      .then(setAlquileres)
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(filtroEstado); }, [filtroEstado]);

  const handleDevolver = async () => {
    if (!fechaDev) return;
    const res = await devolverAlquiler(devolviendo, fechaDev);
    if (res.error) { alert("No se pudo registrar la devolución."); return; }
    setDevolviendo(null);
    cargar(filtroEstado);
  };

  const handleCancelar = async (id) => {
    if (!confirm("¿Cancelar este alquiler?")) return;
    const res = await cancelarAlquiler(id);
    if (res.error) { alert("No se pudo cancelar."); return; }
    cargar(filtroEstado);
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este alquiler?")) return;
    await eliminarAlquiler(id);
    setAlquileres((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#f0ede8]">Alquileres</h1>
          <div className="gold-line w-12 mt-2" />
        </div>
        <Link
          to="/admin/alquileres/nuevo"
          className="px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase bg-gold text-luxury hover:bg-gold-light rounded-sm transition-all duration-200"
        >
          + Nuevo alquiler
        </Link>
      </div>

      {/* Filtro estado */}
      <div className="flex gap-2 p-1.5 rounded-sm border border-gold/15 bg-luxury-surface w-fit">
        {ESTADOS.map((e) => (
          <button
            key={e.value}
            onClick={() => setSearchParams(e.value ? { estado: e.value } : {})}
            className={`px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-sm transition-all duration-200 ${
              filtroEstado === e.value
                ? "bg-gold text-luxury shadow-[0_0_10px_rgba(201,168,76,0.35)]"
                : "text-luxury-muted hover:text-[#f0ede8] hover:bg-gold/10"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Modal devolución */}
      {devolviendo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="luxury-card rounded-xl shadow-2xl p-7 w-88 max-w-sm w-full space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[#f0ede8]">Registrar devolución</h2>
              <div className="gold-line w-10 mt-2" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-1.5">Fecha de devolución</label>
              <input
                type="date"
                value={fechaDev}
                onChange={(e) => setFechaDev(e.target.value)}
                className="w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDevolver}
                className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase bg-gold text-luxury hover:bg-gold-light rounded-sm transition-all duration-200"
              >
                Confirmar
              </button>
              <button
                onClick={() => setDevolviendo(null)}
                className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-luxury-muted animate-pulse text-sm">Cargando…</p>
      ) : alquileres.length === 0 ? (
        <p className="text-luxury-muted text-sm">No hay alquileres.</p>
      ) : (
        <div className="luxury-card rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10">
                {["Cliente","Vehículo","Inicio","Fin previsto","$/día","Total","Estado",""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-luxury-muted tracking-[0.18em] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alquileres.map((a) => (
                <tr key={a.id} className="border-b border-gold/5 hover:bg-gold/5 transition-colors duration-150">
                  <td className="px-4 py-3 text-[#f0ede8] font-medium">{a.cliente ? `${a.cliente.nombre} ${a.cliente.apellido}` : "—"}</td>
                  <td className="px-4 py-3 text-luxury-muted">{a.vehiculo?.patente || "—"}</td>
                  <td className="px-4 py-3 text-luxury-muted">{new Date(a.fechaInicio).toLocaleDateString("es-AR")}</td>
                  <td className="px-4 py-3 text-luxury-muted">{new Date(a.fechaFinPrevista).toLocaleDateString("es-AR")}</td>
                  <td className="px-4 py-3 text-luxury-muted">${a.precioPorDia}</td>
                  <td className="px-4 py-3 text-luxury-muted">{a.totalCalculado ? `$${a.totalCalculado}` : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2.5 py-1 rounded-sm font-semibold tracking-wide ${estadoBadge[a.estado]}`}>
                      {a.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      {a.estado === "activo" && (
                        <>
                          <button
                            onClick={() => { setDevolviendo(a.id); setFechaDev(new Date().toISOString().slice(0, 10)); }}
                            className="px-2.5 py-1 text-xs font-medium border border-emerald-700/40 text-emerald-400/80 hover:border-emerald-500 hover:text-emerald-400 rounded-sm transition-colors"
                          >
                            Devolver
                          </button>
                          <button
                            onClick={() => handleCancelar(a.id)}
                            className="px-2.5 py-1 text-xs font-medium border border-amber-700/40 text-amber-400/80 hover:border-amber-500 hover:text-amber-400 rounded-sm transition-colors"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEliminar(a.id)}
                        className="px-2.5 py-1 text-xs font-medium border border-red-800/40 text-red-400/70 hover:border-red-500 hover:text-red-400 rounded-sm transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/admin" className="text-xs text-luxury-muted hover:text-gold transition-colors tracking-wide">← Inicio</Link>
    </div>
  );
}
