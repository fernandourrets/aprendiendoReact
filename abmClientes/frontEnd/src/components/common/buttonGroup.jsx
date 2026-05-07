
export default function ButtonGroup({ dataCategoria, selectedItem = "all", onClick }) {
  return (
    <div className="flex justify-center py-6">
      <div className="flex gap-2 p-1.5 rounded-sm border border-gold/15 bg-luxury-surface">
        {dataCategoria && dataCategoria.length > 0
          ? dataCategoria.map((e) => (
              <button
                key={e.id}
                onClick={() => onClick(e.name)}
                className={`px-5 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase rounded-sm transition-all duration-200 ${
                  selectedItem === e.name
                    ? "bg-gold text-luxury shadow-[0_0_12px_rgba(201,168,76,0.4)]"
                    : "text-luxury-muted hover:text-[#f0ede8] hover:bg-gold/10"
                }`}
              >
                {e.label}
              </button>
            ))
          : <span className="text-luxury-muted text-xs px-4">Sin categorías</span>
        }
      </div>
    </div>
  );
}