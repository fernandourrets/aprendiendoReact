
import { Link } from "react-router-dom"

const errorType = {
  error_desconocido: {
    title: "Error desconocido",
    description: "Se produjo un error desconocido en la aplicación.",
    code: "000",
  },
  not_found: {
    title: "Página no encontrada",
    description: "La ruta solicitada no existe.",
    code: "404",
    redirect: { linkTo: "/", text: "Volver al inicio" },
  },
  error_404: {
    title: "Página no encontrada",
    description: "La ruta solicitada no existe.",
    code: "404",
    redirect: { linkTo: "/", text: "Volver al inicio" },
  },
};

export default function Error({ type }) {
  const info = errorType[type] || errorType.error_desconocido;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-fade-in">
      <p className="text-[80px] font-bold leading-none gold-text">{info.code}</p>
      <div className="gold-line w-16 my-5 mx-auto" />
      <h1 className="text-2xl font-bold tracking-tight text-[#f0ede8] mb-2">{info.title}</h1>
      <p className="text-luxury-muted text-sm tracking-wide mb-8">{info.description}</p>
      {info.redirect && (
        <Link
          to={info.redirect.linkTo}
          className="px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase bg-gold text-luxury hover:bg-gold-light rounded-sm transition-all duration-200"
        >
          {info.redirect.text}
        </Link>
      )}
    </div>
  );
}