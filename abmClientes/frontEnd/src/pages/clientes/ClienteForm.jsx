import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getClienteById, crearCliente, actualizarCliente } from "@/lib/api/clientes";

const EMPTY = { dni: "", nombre: "", apellido: "", email: "", celular: "" };

export default function ClienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    getClienteById(id)
      .then((cli) =>
        setForm({
          dni: cli.dni ?? "",
          nombre: cli.nombre ?? "",
          apellido: cli.apellido ?? "",
          email: cli.email ?? "",
          celular: cli.celular ?? "",
        })
      )
      .catch(() => setError("No se pudo cargar el cliente."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = isEdit
        ? await actualizarCliente(id, form)
        : await crearCliente(form);
      if (res.error) {
        setError(res.message || "Error al guardar.");
      } else {
        navigate(isEdit ? `/admin/clientes/${id}` : "/admin/clientes");
      }
    } catch {
      setError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8 text-luxury-muted animate-pulse tracking-widest text-sm uppercase">Cargando…</p>;

  return (
    <div className="max-w-lg mx-auto px-6 py-10 animate-fade-in">
      <p className="text-[10px] text-luxury-muted tracking-[0.25em] uppercase mb-1">
        {isEdit ? "Editar" : "Nuevo"}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-[#f0ede8] mb-1">
        {isEdit ? "Editar cliente" : "Nuevo cliente"}
      </h1>
      <div className="gold-line w-12 mb-8" />

      {error && (
        <p className="mb-5 p-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-sm text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="luxury-card rounded-xl p-7 space-y-5">
        <Field label="DNI" name="dni" type="number" value={form.dni} onChange={handleChange} required />
        <Field label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
        <Field label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <Field label="Celular" name="celular" type="number" value={form.celular} onChange={handleChange} />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase bg-gold text-luxury hover:bg-gold-light disabled:opacity-50 rounded-sm transition-all duration-200"
          >
            {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear cliente"}
          </button>
          <Link
            to={isEdit ? `/admin/clientes/${id}` : "/admin/clientes"}
            className="flex-1 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-center border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder-luxury-muted focus:outline-none focus:border-gold/50 transition-colors"
      />
    </div>
  );
}
