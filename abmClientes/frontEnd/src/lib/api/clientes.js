
const BASE = '/api';

// Normaliza el tipo de vehículo ("Automóvil" → "automovil") para coincidir con categoryMap
export function getCategoria(cliente) {
  const tipo = cliente.vehiculos?.[0]?.modelo?.marca?.tipo?.tipoVehiculo || '';
  return tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export const getClientes = async (search) => {
  const url = search
    ? `${BASE}/clientes?search=${encodeURIComponent(search)}`
    : `${BASE}/clientes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener clientes');
  return res.json();
};

export const getClienteById = async (id) => {
  const res = await fetch(`${BASE}/clientes/${id}`);
  if (!res.ok) throw new Error('Cliente no encontrado');
  return res.json();
};

export const getCliByCategorias = async (buscarCategoria) => {
  const all = await getClientes();
  return all.filter(c => getCategoria(c) === buscarCategoria);
};

export const crearCliente = async (data) => {
  const res = await fetch(`${BASE}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const actualizarCliente = async (id, data) => {
  const res = await fetch(`${BASE}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const eliminarCliente = async (id) => {
  const res = await fetch(`${BASE}/clientes/${id}`, { method: 'DELETE' });
  return res.json();
};