const BASE = '/api';

export const getCategories = async () => {
  try {
    const res = await fetch(`${BASE}/catalogos/tipos`);
    const tipos = await res.json();
    return tipos.map(t => ({
      id: t.id,
      name: t.tipoVehiculo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
      label: t.tipoVehiculo,
    }));
  } catch {
    return [
      { id: 1, name: 'automovil', label: 'Automóvil' },
      { id: 2, name: 'motocicleta', label: 'Motocicleta' },
      { id: 3, name: 'utilitario', label: 'Utilitario' },
    ];
  }
};

/*----------------------------------------------------------*/

// export const getCatByCat = async (buscarCategoria) => {


//     const allCategories = await getCategories()

//     const res= allCategories.filter(e => e.name == buscarCategoria)
//     return res
    
//     }