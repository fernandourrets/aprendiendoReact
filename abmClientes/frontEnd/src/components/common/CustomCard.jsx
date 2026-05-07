import { Link } from "react-router-dom"
import { categoryMap } from "@/lib/maps/category"
import { Car, ChevronRight } from "lucide-react"
import { getCategoria } from "@/lib/api/clientes"

const DEFAULT_CAT = { label: 'Sin categoría', icon: Car }

export default function CustomCard({ cardClientes }) {
  const { id, dni, nombre, apellido } = cardClientes
  const cat = getCategoria(cardClientes)
  const catInfo = categoryMap[cat] || DEFAULT_CAT
  const IconComponent = catInfo.icon

  return (
    <Link to={`/admin/clientes/${id}`} className="group block animate-fade-in-up">
      <div className="luxury-card rounded-xl p-6 flex flex-col gap-5 h-full">

        {/* Top row: icon badge + category label */}
        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-lg bg-gold/10 border border-gold/20">
            <IconComponent className="w-5 h-5 text-gold" />
          </div>
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gold border border-gold/25 px-2.5 py-1 rounded-sm">
            {catInfo.label}
          </span>
        </div>

        {/* Client info */}
        <div className="text-left">
          <p className="text-[10px] text-luxury-muted tracking-[0.2em] uppercase mb-1">Cliente</p>
          <h3 className="text-base font-bold text-[#f0ede8] group-hover:text-gold transition-colors duration-300 leading-tight">
            {nombre} {apellido}
          </h3>
          <p className="text-xs text-luxury-muted mt-1.5">DNI {dni}</p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gold/10 flex items-center justify-between">
          <span className="text-[11px] text-luxury-muted tracking-wide">Ver perfil</span>
          <ChevronRight className="w-4 h-4 text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
        </div>
      </div>
    </Link>
  )
}