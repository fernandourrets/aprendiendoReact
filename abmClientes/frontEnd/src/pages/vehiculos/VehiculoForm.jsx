import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getVehiculoById,
  crearVehiculo,
  actualizarVehiculo,
  getCatalogos,
} from "@/lib/api/vehiculos";
import { getClientes } from "@/lib/api/clientes";

const EMPTY = { patente: "", año: "", modeloVehiculoId: "", clienteId: "" };

export default function VehiculoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Catálogos para los dropdowns
  const [tipos, setTipos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [clientes, setClientes] = useState([]);

  // Selección en cascada
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");

  // Carga inicial: catálogos + datos del vehículo si es edición
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catalog, clis] = await Promise.all([getCatalogos(), getClientes()]);
        setTipos(catalog);
        setClientes(clis);

        if (isEdit) {
          const v = await getVehiculoById(id);
          // Reconstruir la cascada desde el modelo
          const tipoId = v.modelo?.marca?.tipoVehiculoId;
          const marcaId = v.modelo?.marcaVehiculoId;
          const tipoData = catalog.find((t) => t.id === tipoId);
          const marcaData = tipoData?.marcas?.find((m) => m.id === marcaId);
          setSelectedTipo(String(tipoId || ""));
          setMarcas(tipoData?.marcas || []);
          setSelectedMarca(String(marcaId || ""));
          setModelos(marcaData?.modelos || []);
          setForm({
            patente: v.patente ?? "",
            año: v.año ?? "",
            modeloVehiculoId: v.modeloVehiculoId ?? "",
            clienteId: v.clienteId ?? "",
          });
        }
      } catch {
        setError("Error al cargar datos.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id, isEdit]);

  // Cuando cambia el tipo
  const handleTipoChange = (e) => {
    const tipoId = e.target.value;
    setSelectedTipo(tipoId);
    setSelectedMarca("");
    setModelos([]);
    setForm((prev) => ({ ...prev, modeloVehiculoId: "" }));
    if (!tipoId) { setMarcas([]); return; }
    const tipo = tipos.find((t) => String(t.id) === tipoId);
    setMarcas(tipo?.marcas || []);
  };

  // Cuando cambia la marca
  const handleMarcaChange = (e) => {
    const marcaId = e.target.value;
    setSelectedMarca(marcaId);
    setForm((prev) => ({ ...prev, modeloVehiculoId: "" }));
    if (!marcaId) { setModelos([]); return; }
    const marca = marcas.find((m) => String(m.id) === marcaId);
    setModelos(marca?.modelos || []);
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        patente: form.patente,
        año: Number(form.año),
        modeloVehiculoId: Number(form.modeloVehiculoId),
        clienteId: form.clienteId ? Number(form.clienteId) : null,
      };
      const res = isEdit
        ? await actualizarVehiculo(id, payload)
        : await crearVehiculo(payload);
      if (res.error) {
        setError(res.message || "Error al guardar.");
      } else {
        navigate("/admin/vehiculos");
      }
    } catch {
      setError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8 text-luxury-muted animate-pulse tracking-widest text-sm uppercase">Cargando…</p>;

  const selectClass = "w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-40";
  const inputClass  = "w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder-luxury-muted focus:outline-none focus:border-gold/50 transition-colors";
  const labelClass  = "block text-[10px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-1.5";

  return (
    <div className="max-w-lg mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[10px] text-luxury-muted tracking-[0.25em] uppercase mb-1">
        {isEdit ? "Editar" : "Nuevo"}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-[#f0ede8] mb-1">
        {isEdit ? "Editar vehículo" : "Nuevo vehículo"}
      </h1>
      <div className="gold-line w-12 mb-8" />

      {error && (
        <p className="mb-5 p-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-sm text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="luxury-card rounded-xl p-7 space-y-5">
        {/* Tipo */}
        <div>
          <label className={labelClass}>Tipo de vehículo</label>
          <select value={selectedTipo} onChange={handleTipoChange} required className={selectClass}>
            <option value="">Seleccioná un tipo…</option>
            {tipos.map((t) => <option key={t.id} value={t.id}>{t.tipoVehiculo}</option>)}
          </select>
        </div>

        {/* Marca */}
        <div>
          <label className={labelClass}>Marca</label>
          <select value={selectedMarca} onChange={handleMarcaChange} required disabled={!selectedTipo} className={selectClass}>
            <option value="">Seleccioná una marca…</option>
            {marcas.map((m) => <option key={m.id} value={m.id}>{m.marcaVehiculo}</option>)}
          </select>
        </div>

        {/* Modelo */}
        <div>
          <label className={labelClass}>Modelo</label>
          <select name="modeloVehiculoId" value={form.modeloVehiculoId} onChange={handleChange} required disabled={!selectedMarca} className={selectClass}>
            <option value="">Seleccioná un modelo…</option>
            {modelos.map((m) => <option key={m.id} value={m.id}>{m.modeloVehiculo}</option>)}
          </select>
        </div>

        {/* Año */}
        <div>
          <label className={labelClass}>Año</label>
          <input type="number" name="año" value={form.año} onChange={handleChange} required min="1900" max={new Date().getFullYear() + 1} className={inputClass} />
        </div>

        {/* Patente */}
        <div>
          <label className={labelClass}>Patente</label>
          <input type="text" name="patente" value={form.patente} onChange={handleChange} required className={inputClass} />
        </div>

        {/* Cliente opcional */}
        <div>
          <label className={labelClass}>
            Cliente asociado <span className="text-luxury-muted/50 normal-case tracking-normal">(opcional)</span>
          </label>
          <select name="clienteId" value={form.clienteId} onChange={handleChange} className={selectClass}>
            <option value="">Sin cliente</option>
            {clientes.map((c) => <option key={c.id} value={c.id}>{c.nombre} {c.apellido}</option>)}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase bg-gold text-luxury hover:bg-gold-light disabled:opacity-50 rounded-sm transition-all duration-200"
          >
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear vehículo"}
          </button>
          <Link
            to="/admin/vehiculos"
            className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-center border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
