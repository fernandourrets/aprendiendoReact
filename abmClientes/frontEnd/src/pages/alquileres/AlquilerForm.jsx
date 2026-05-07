import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { crearAlquiler } from "@/lib/api/alquileres";
import { getClientes } from "@/lib/api/clientes";
import { getVehiculos } from "@/lib/api/vehiculos";

const EMPTY = {
  clienteId: "",
  vehiculoId: "",
  fechaInicio: "",
  fechaFinPrevista: "",
  precioPorDia: "",
  observaciones: "",
};

export default function AlquilerForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preClienteId = searchParams.get("clienteId") || "";

  const [form, setForm] = useState({ ...EMPTY, clienteId: preClienteId });
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [busquedaCliente, setBusquedaCliente] = useState("");

  useEffect(() => {
    Promise.all([getClientes(), getVehiculos(true)])
      .then(([clis, vehs]) => {
        setClientes(clis);
        setVehiculos(vehs);
      })
      .catch(() => setError("Error al cargar datos."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Cálculos derivados ──────────────────────────────────────────────────────
  const diasCalculados = useMemo(() => {
    if (!form.fechaInicio || !form.fechaFinPrevista) return null;
    const diff = new Date(form.fechaFinPrevista) - new Date(form.fechaInicio);
    return Math.round(diff / (1000 * 60 * 60 * 24));
  }, [form.fechaInicio, form.fechaFinPrevista]);

  const totalEstimado = useMemo(() => {
    if (!diasCalculados || diasCalculados <= 0 || !form.precioPorDia) return null;
    return (diasCalculados * Number(form.precioPorDia)).toFixed(2);
  }, [diasCalculados, form.precioPorDia]);

  // ── Validaciones inline ────────────────────────────────────────────────────
  const fechaError = useMemo(() => {
    if (!form.fechaInicio || !form.fechaFinPrevista) return null;
    if (diasCalculados !== null && diasCalculados <= 0)
      return "La fecha de fin debe ser posterior a la de inicio.";
    return null;
  }, [form.fechaInicio, form.fechaFinPrevista, diasCalculados]);

  // ── Clientes filtrados por búsqueda ─────────────────────────────────────
  const clientesFiltrados = useMemo(() => {
    if (!busquedaCliente.trim()) return clientes;
    const q = busquedaCliente.toLowerCase();
    return clientes.filter(
      (c) =>
        c.nombre.toLowerCase().includes(q) ||
        c.apellido.toLowerCase().includes(q) ||
        String(c.dni).includes(q)
    );
  }, [clientes, busquedaCliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fechaError) { setError(fechaError); return; }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        clienteId: Number(form.clienteId),
        vehiculoId: Number(form.vehiculoId),
        fechaInicio: form.fechaInicio,
        fechaFinPrevista: form.fechaFinPrevista,
        precioPorDia: Number(form.precioPorDia),
        observaciones: form.observaciones || null,
      };
      const res = await crearAlquiler(payload);
      if (res.error) {
        const msgs = {
          vehiculo_no_disponible: "El vehículo seleccionado ya tiene un alquiler activo. Refrescá la página para ver la lista actualizada.",
          required: "Completá todos los campos obligatorios.",
          fecha_invalida: "Las fechas son inválidas.",
        };
        setError(msgs[res.error] || res.message || "Error al registrar.");
      } else {
        navigate("/admin/alquileres");
      }
    } catch {
      setError("Error de conexión con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8 text-luxury-muted animate-pulse tracking-widest text-sm uppercase">Cargando…</p>;

  const dias = diasCalculados;
  const total = totalEstimado;
  const inputClass = "w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder-luxury-muted focus:outline-none focus:border-gold/50 transition-colors";
  const selectClass = "w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] focus:outline-none focus:border-gold/50 transition-colors";
  const labelClass  = "block text-[10px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-1.5";

  return (
    <div className="max-w-lg mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[10px] text-luxury-muted tracking-[0.25em] uppercase mb-1">Nuevo</p>
      <h1 className="text-3xl font-bold tracking-tight text-[#f0ede8] mb-1">Nuevo alquiler</h1>
      <div className="gold-line w-12 mb-8" />

      {error && (
        <p className="mb-5 p-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-sm text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="luxury-card rounded-xl p-7 space-y-5">

        {/* Cliente */}
        <div>
          <label className={labelClass}>Cliente</label>
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o DNI…"
            value={busquedaCliente}
            onChange={(e) => setBusquedaCliente(e.target.value)}
            className={`${inputClass} rounded-b-none border-b-0`}
          />
          <select
            name="clienteId"
            value={form.clienteId}
            onChange={handleChange}
            required
            size={Math.min(clientesFiltrados.length + 1, 5)}
            className={`${selectClass} rounded-t-none`}
          >
            <option value="">Seleccioná un cliente…</option>
            {clientesFiltrados.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre} {c.apellido} — DNI {c.dni}</option>
            ))}
          </select>
        </div>

        {/* Vehículo */}
        <div>
          <label className={labelClass}>Vehículo disponible</label>
          <select name="vehiculoId" value={form.vehiculoId} onChange={handleChange} required className={selectClass}>
            <option value="">Seleccioná un vehículo…</option>
            {vehiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.modelo?.marca?.marcaVehiculo} {v.modelo?.modeloVehiculo} — {v.patente} ({v.año})
              </option>
            ))}
          </select>
          {vehiculos.length === 0 && (
            <p className="text-xs text-amber-400/80 mt-1.5">No hay vehículos disponibles en este momento.</p>
          )}
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Fecha inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
              required
              className={`${inputClass} ${fechaError ? "border-red-500/50" : ""}`}
            />
          </div>
          <div>
            <label className={labelClass}>Fecha fin prevista</label>
            <input
              type="date"
              name="fechaFinPrevista"
              value={form.fechaFinPrevista}
              onChange={handleChange}
              required
              min={form.fechaInicio || undefined}
              className={`${inputClass} ${fechaError ? "border-red-500/50" : ""}`}
            />
          </div>
        </div>
        {fechaError && <p className="text-xs text-red-400 -mt-3">{fechaError}</p>}

        {/* Precio */}
        <div>
          <label className={labelClass}>Precio por día ($)</label>
          <input
            type="number"
            name="precioPorDia"
            value={form.precioPorDia}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className={inputClass}
          />
        </div>

        {/* Resumen calculado */}
        {dias !== null && dias > 0 && (
          <div className="bg-gold/8 border border-gold/20 rounded-sm px-4 py-3">
            <p className="text-sm text-gold">
              <span className="font-semibold">{dias} días</span>
              {total && <span className="text-luxury-muted"> · Total estimado: <span className="font-semibold text-gold">${total}</span></span>}
            </p>
          </div>
        )}

        {/* Observaciones */}
        <div>
          <label className={labelClass}>
            Observaciones <span className="text-luxury-muted/50 normal-case tracking-normal">(opcional)</span>
          </label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase bg-gold text-luxury hover:bg-gold-light disabled:opacity-50 rounded-sm transition-all duration-200"
          >
            {saving ? "Registrando…" : "Registrar alquiler"}
          </button>
          <Link
            to="/admin/alquileres"
            className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-center border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
