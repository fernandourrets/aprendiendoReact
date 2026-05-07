import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 animate-fade-in">
      {/* Brand */}
      <Link to="/" className="flex flex-col items-center mb-10 group">
        <span className="gold-text text-2xl font-bold tracking-[0.3em] uppercase">AutoPremium</span>
        <span className="text-[10px] text-luxury-muted tracking-[0.45em] uppercase mt-1">Luxury Car Rental</span>
      </Link>

      <div className="luxury-card rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold tracking-tight text-[#f0ede8] mb-1">Iniciar sesión</h1>
        <div className="gold-line w-10 mb-6" />

        {error && (
          <p className="mb-5 p-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-sm text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-1.5">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder-luxury-muted focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full bg-luxury-surface border border-gold/15 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder-luxury-muted focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs font-semibold tracking-[0.2em] uppercase bg-gold text-luxury hover:bg-gold-light disabled:opacity-50 rounded-sm transition-all duration-200 mt-2"
          >
            {loading ? "Verificando…" : "Ingresar"}
          </button>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="text-xs text-luxury-muted hover:text-gold transition-colors tracking-wide">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
