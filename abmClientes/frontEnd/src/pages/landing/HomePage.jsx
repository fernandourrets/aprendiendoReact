import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Shield, Star, Clock, ChevronRight, Phone, ChevronDown } from "lucide-react";

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

const FAQ = [
  {
    q: "¿Qué requisitos necesito para alquilar?",
    a: "DNI vigente, licencia de conducir habilitante, tarjeta de crédito/débito a tu nombre y ser mayor de 21 años. Para vehículos deportivos o SUV premium se requieren mínimo 25 años.",
  },
  {
    q: "¿El seguro está incluido en el precio?",
    a: "Sí. Todos los vehículos incluyen cobertura de responsabilidad civil y daños propios. Podés solicitar una extensión de cobertura con franquicia reducida al momento de reservar.",
  },
  {
    q: "¿Puedo cancelar o modificar mi reserva?",
    a: "Podés cancelar sin costo hasta 48 horas antes del inicio del alquiler. Las cancelaciones dentro de las 48 horas tienen un cargo del 30% del valor total.",
  },
  {
    q: "¿Los vehículos tienen kilometraje ilimitado?",
    a: "Los alquileres de 3 o más días incluyen kilometraje ilimitado. Para períodos menores, el plan base incluye 300 km diarios; el excedente se factura al cierre del contrato.",
  },
  {
    q: "¿Dónde puedo retirar y devolver el vehículo?",
    a: "Contamos con nuestra sede central en Córdoba Capital. También coordinamos entrega y retiro a domicilio, aeropuerto o terminal de ómnibus con previo acuerdo.",
  },
];

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gold/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-medium text-[#f0ede8] group-hover:text-gold transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gold/50 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <p className="pb-5 text-sm text-luxury-muted leading-relaxed animate-fade-in">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

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

      {/* ── FAQ ── */}
      <section className="py-20 px-6 border-t border-gold/10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.35em] uppercase text-center mb-2">FAQ</p>
          <h2 className="text-2xl font-bold text-[#f0ede8] text-center mb-12">Preguntas frecuentes</h2>
          <div className="luxury-card rounded-xl px-6">
            {FAQ.map((item, i) => (
              <FaqItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Component Showcase ── */}
      <section className="py-20 px-6 border-t border-gold/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold text-luxury-muted tracking-[0.35em] uppercase text-center mb-2">Sistema de diseño</p>
          <h2 className="text-2xl font-bold text-[#f0ede8] text-center mb-12">Catálogo de componentes</h2>
          <div className="grid gap-6">

            {/* Botones */}
            <div className="luxury-card rounded-xl p-6">
              <h3 className="text-xs font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-5">Botones</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase bg-gold text-luxury hover:bg-gold-light rounded-sm transition-all duration-200 shadow-[0_0_16px_rgba(201,168,76,0.2)]">
                  Primario
                </button>
                <button className="px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase border border-gold text-gold hover:bg-gold hover:text-luxury rounded-sm transition-all duration-200">
                  Contorno
                </button>
                <button className="px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase border border-white/10 text-[#f0ede8]/70 hover:bg-white/5 hover:text-[#f0ede8] rounded-sm transition-all duration-200">
                  Secundario
                </button>
                <button className="px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase border border-red-800/40 text-red-400/70 hover:border-red-500 hover:text-red-400 rounded-sm transition-all duration-200">
                  Destructivo
                </button>
                <button disabled className="px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase bg-gold/30 text-luxury/50 rounded-sm cursor-not-allowed opacity-50">
                  Deshabilitado
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="luxury-card rounded-xl p-6">
              <h3 className="text-xs font-semibold text-luxury-muted tracking-[0.25em] uppercase mb-5">Badges</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Activo</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">Pendiente</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">Cancelado</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">En curso</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gold/30 text-gold/70">Premium</span>
              </div>
            </div>

            {/* Card + Inputs */}
            <div className="grid sm:grid-cols-2 gap-6">

              {/* Card demo */}
              <div className="luxury-card rounded-xl p-6 flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-luxury-muted tracking-[0.25em] uppercase">Tarjeta</h3>
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 w-fit">
                  <Star className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f0ede8] mb-1.5">Luxury Card</h4>
                  <p className="text-xs text-luxury-muted leading-relaxed">
                    Componente con fondo oscuro, borde dorado y efecto de elevación al hacer hover.
                  </p>
                </div>
                <button className="mt-auto text-[11px] font-semibold tracking-[0.14em] uppercase text-gold/70 hover:text-gold transition-colors flex items-center gap-1 w-fit">
                  Ver detalle <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Input demo */}
              <div className="luxury-card rounded-xl p-6 flex flex-col gap-4">
                <h3 className="text-xs font-semibold text-luxury-muted tracking-[0.25em] uppercase">Inputs</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-2">
                      Campo de texto
                    </label>
                    <input
                      type="text"
                      placeholder="Escribí aquí..."
                      className="w-full bg-luxury-surface border border-gold/20 rounded-sm px-4 py-2.5 text-sm text-[#f0ede8] placeholder:text-luxury-muted/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-luxury-muted tracking-[0.2em] uppercase mb-2">
                      Deshabilitado
                    </label>
                    <input
                      type="text"
                      disabled
                      placeholder="Campo deshabilitado"
                      className="w-full bg-luxury-surface/40 border border-gold/10 rounded-sm px-4 py-2.5 text-sm text-luxury-muted/40 placeholder:text-luxury-muted/30 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

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
