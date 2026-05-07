import { Link } from "react-router-dom";
import { Car, Shield, Star, Clock, ChevronRight, Phone } from "lucide-react";

const FLEET = [
  { name: "Sedán de Lujo",   desc: "Confort y elegancia para traslados ejecutivos.", icon: Car    },
  { name: "SUV Premium",     desc: "Espacio y potencia con acabados de primera clase.", icon: Car },
  { name: "Deportivo",       desc: "Adrenalina pura en cada curva.",                   icon: Car },
];

const FEATURES = [
  { icon: Shield, title: "Seguridad garantizada",    desc: "Toda nuestra flota cuenta con seguro full y mantenimiento certificado." },
  { icon: Star,   title: "Experiencia premium",      desc: "Atención personalizada, vehiculos impecables y condiciones claras." },
  { icon: Clock,  title: "Disponibilidad 24/7",      desc: "Coordinamos tu alquiler en el horario que mejor te convenga." },
  { icon: Phone,  title: "Soporte durante el viaje", desc: "Te acompañamos en todo momento para que disfrutes sin preocupaciones." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Navbar public ── */}
      <header className="sticky top-0 z-50 bg-luxury/95 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none gap-0.5">
            <span className="gold-text text-lg font-bold tracking-[0.22em] uppercase">AutoPremium</span>
            <span className="text-[10px] text-luxury-muted tracking-[0.4em] uppercase">Luxury Car Rental</span>
          </Link>

          <Link
            to="/login"
            className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase border border-gold text-gold hover:bg-gold hover:text-luxury rounded-sm transition-all duration-200"
          >
            Ingresar
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        {/* subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />

        <p className="text-[11px] text-luxury-muted tracking-[0.4em] uppercase mb-4 animate-fade-in">
          Córdoba, Argentina
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#f0ede8] leading-none mb-4 animate-fade-in-up">
          Vehículos <span className="gold-text">de lujo</span>,<br />sin límites.
        </h1>
        <div className="gold-line w-16 my-6 mx-auto" />
        <p className="max-w-lg text-base text-luxury-muted leading-relaxed mb-10 animate-fade-in">
          Alquilá el auto que siempre quisiste manejar. Flota premium, atención personalizada y condiciones transparentes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Link
            to="/login"
            className="flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-gold text-luxury hover:bg-gold-light rounded-sm transition-all duration-200 shadow-[0_0_24px_rgba(201,168,76,0.3)]"
          >
            Reservar ahora <ChevronRight className="w-4 h-4" />
          </Link>
          <a
            href="#flota"
            className="px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-all duration-200"
          >
            Ver flota
          </a>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.35em] uppercase text-center mb-2">Por qué elegirnos</p>
          <h2 className="text-2xl font-bold text-[#f0ede8] text-center mb-12">La diferencia AutoPremium</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="luxury-card rounded-xl p-6 flex flex-col gap-4">
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 w-fit">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#f0ede8] mb-1.5">{title}</h3>
                  <p className="text-xs text-luxury-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet ── */}
      <section id="flota" className="py-20 px-6 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.35em] uppercase text-center mb-2">Nuestra flota</p>
          <h2 className="text-2xl font-bold text-[#f0ede8] text-center mb-12">Vehículos disponibles</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {FLEET.map(({ name, desc, icon: Icon }) => (
              <div key={name} className="luxury-card rounded-xl p-6 flex flex-col gap-4">
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 w-fit">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#f0ede8] mb-1.5">{name}</h3>
                  <p className="text-xs text-luxury-muted leading-relaxed">{desc}</p>
                </div>
                <Link
                  to="/login"
                  className="mt-auto text-[11px] font-semibold tracking-[0.14em] uppercase text-gold/70 hover:text-gold transition-colors flex items-center gap-1"
                >
                  Consultar disponibilidad <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20 px-6 border-t border-gold/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#f0ede8] mb-4">Listo para salir a la ruta?</h2>
          <p className="text-luxury-muted mb-8">Ingresá al panel y gestioná tu reserva en minutos.</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase bg-gold text-luxury hover:bg-gold-light rounded-sm transition-all duration-200 shadow-[0_0_24px_rgba(201,168,76,0.25)]"
          >
            Iniciar sesión <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-gold/10 bg-[#080808] px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="gold-text text-sm font-bold tracking-[0.3em] uppercase">AutoPremium</p>
          <p className="text-xs text-[#444] tracking-wide">
            © {new Date().getFullYear()} AutoPremium — Córdoba, Argentina
          </p>
        </div>
      </footer>
    </div>
  );
}
