const BASE = '/api';

export const getVehiculos = async (disponibles = false) => {
  const url = disponibles ? `${BASE}/vehiculos?disponibles=true` : `${BASE}/vehiculos`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener vehículos');
  return res.json();
};

export const getVehiculoById = async (id) => {
  const res = await fetch(`${BASE}/vehiculos/${id}`);
  if (!res.ok) throw new Error('Vehículo no encontrado');
  return res.json();
};

export const crearVehiculo = async (data) => {
  const res = await fetch(`${BASE}/vehiculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const actualizarVehiculo = async (id, data) => {
  const res = await fetch(`${BASE}/vehiculos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const eliminarVehiculo = async (id) => {
  const res = await fetch(`${BASE}/vehiculos/${id}`, { method: 'DELETE' });
  return res.json();
};

export const getCatalogos = async () => {
  const res = await fetch(`${BASE}/catalogos/tipos`);
  if (!res.ok) throw new Error('Error al obtener catálogos');
  return res.json();
};
