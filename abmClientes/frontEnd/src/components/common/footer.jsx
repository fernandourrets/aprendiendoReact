import { Link } from "react-router-dom";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gold/10 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <p className="gold-text text-sm font-bold tracking-[0.3em] uppercase mb-3">
            AutoPremium
          </p>
          <div className="gold-line w-8 mb-4" />
          <p className="text-[#444] text-xs leading-relaxed tracking-wide">
            Alquiler de vehículos de lujo.<br />Experiencia premium en cada kilómetro.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-5">Secciones</p>
          <ul className="space-y-3">
            {[
              { to: "/admin/clientes",   label: "Clientes"   },
              { to: "/admin/vehiculos",  label: "Vehículos"  },
              { to: "/admin/alquileres", label: "Alquileres" },
              { to: "/admin",            label: "Dashboard"  },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-xs text-[#555] hover:text-gold transition-colors tracking-wide">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-5">Contacto</p>
          <ul className="space-y-3 text-xs text-[#555] tracking-wide">
            <li>Córdoba, Argentina</li>
            <li>+54 351 123 4567</li>
            <li>contacto@autopremium.com</li>
          </ul>
        </div>

        {/* Horarios */}
        <div>
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-5">Horarios</p>
          <ul className="space-y-3 text-xs text-[#555] tracking-wide">
            <li>Lun – Vie &nbsp;·&nbsp; 9:00 – 18:00</li>
            <li>Sábados &nbsp;·&nbsp; 9:00 – 13:00</li>
            <li>Domingos &nbsp;·&nbsp; Cerrado</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/8 text-center py-5">
        <p className="text-[10px] text-[#333] tracking-[0.2em] uppercase">
          © {YEAR} AutoPremium · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}