import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getVehiculos, eliminarVehiculo } from "@/lib/api/vehiculos";

export default function VehiculosList() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const soloDisponibles = searchParams.get("disponibles") === "true";
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const cargar = (disponibles) => {
    setLoading(true);
    getVehiculos(disponibles)
      .then(setVehiculos)
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(soloDisponibles); }, [soloDisponibles]);

  // Filtro local por patente / marca / modelo
  const vehiculosFiltrados = busqueda.trim()
    ? vehiculos.filter((v) => {
        const q = busqueda.toLowerCase();
        return (
          v.patente?.toLowerCase().includes(q) ||
          v.modelo?.marca?.marcaVehiculo?.toLowerCase().includes(q) ||
          v.modelo?.modeloVehiculo?.toLowerCase().includes(q)
        );
      })
    : vehiculos;

  const handleEliminar = async (v) => {
    if (!confirm(`¿Eliminar ${v.patente}?`)) return;
    const res = await eliminarVehiculo(v.id);
    if (res.error) {
      alert("No se puede eliminar: tiene alquileres activos.");
      return;
    }
    setVehiculos((prev) => prev.filter((x) => x.id !== v.id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#f0ede8]">Vehículos</h1>
          <div className="gold-line w-10 mt-2" />
        </div>
        <Link
          to="/admin/vehiculos/nuevo"
          className="px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase bg-gold text-luxury hover:bg-gold-light rounded-sm transition-all duration-200"
        >
          + Nuevo vehículo
        </Link>
      </div>

      {/* Filtro disponibles */}
      <label className="flex items-center gap-2 text-xs text-luxury-muted tracking-wide cursor-pointer select-none">
        <input
          type="checkbox"
          checked={soloDisponibles}
          onChange={(e) =>
            setSearchParams(e.target.checked ? { disponibles: "true" } : {})
          }
          className="accent-gold rounded"
        />
        Solo disponibles (sin alquiler activo)
      </label>

      {/* Búsqueda */}
      <div className="max-w-sm">
        <input
          type="text"
          placeholder="Buscar por patente, marca o modelo…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder-luxury-muted focus:outline-none focus:border-gold/50 transition-colors"
        />
      </div>

      {loading ? (
        <p className="text-luxury-muted animate-pulse text-sm">Cargando…</p>
      ) : vehiculos.length === 0 ? (
        <p className="text-luxury-muted text-sm">No hay vehículos registrados.</p>
      ) : vehiculosFiltrados.length === 0 ? (
        <p className="text-luxury-muted text-sm">Sin resultados para esa búsqueda.</p>
      ) : (
        <div className="luxury-card rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10">
                {["Patente","Año","Tipo","Marca","Modelo","Cliente",""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-luxury-muted tracking-[0.18em] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehiculosFiltrados.map((v) => (
                <tr key={v.id} className="border-b border-gold/5 hover:bg-gold/5 transition-colors duration-150">
                  <td className="px-4 py-3 font-semibold text-[#f0ede8] tracking-wider">{v.patente}</td>
                  <td className="px-4 py-3 text-luxury-muted">{v.año}</td>
                  <td className="px-4 py-3 text-luxury-muted">{v.modelo?.marca?.tipo?.tipoVehiculo || "—"}</td>
                  <td className="px-4 py-3 text-luxury-muted">{v.modelo?.marca?.marcaVehiculo || "—"}</td>
                  <td className="px-4 py-3 text-luxury-muted">{v.modelo?.modeloVehiculo || "—"}</td>
                  <td className="px-4 py-3 text-luxury-muted">
                    {v.cliente ? `${v.cliente.nombre} ${v.cliente.apellido}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => navigate(`/admin/vehiculos/${v.id}/editar`)}
                        className="px-3 py-1 text-xs font-medium border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(v)}
                        className="px-3 py-1 text-xs font-medium border border-red-800/40 text-red-400/70 hover:border-red-500 hover:text-red-400 rounded-sm transition-colors"
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
