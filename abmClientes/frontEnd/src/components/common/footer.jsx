export default function Footer() {
    return (
      <footer className="bg-gray-700 text-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
          
          {/* Empresa */}
          <div>
            <h2 className="text-xl font-bold text-green-500">
              AutoPremium
            </h2>
            <p className="text-gray-400 mt-3 text-sm">
              Alquiler de autos premium.
            </p>
          </div>
  
          {/* Navegación */}
          <div>
            <h3 className="font-semibold mb-3">Navegación</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Vehículos</a></li>
              <li><a href="#">Alquileres</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
  
          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-3">Contacto</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📍 Córdoba, Argentina</li>
              <li>📞 +54 351 123 4567</li>
              <li>✉ contacto@autopremium.com</li>
            </ul>
          </div>
  
          {/* Horarios */}
          <div>
            <h3 className="font-semibold mb-3">Horarios</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Lun - Vie: 9:00 a 18:00</li>
              <li>Sábados: 9:00 a 13:00</li>
              <li>Domingos: Cerrado</li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-zinc-800 text-center py-4 text-sm text-gray-500">
          © 2026 AutoPremium. Todos los derechos reservados.
        </div>
      </footer>
    );
  }