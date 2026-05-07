const BASE = '/api';

export const getAlquileres = async (estado) => {
  const url = estado ? `${BASE}/alquileres?estado=${estado}` : `${BASE}/alquileres`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener alquileres');
  return res.json();
};

export const getAlquilerById = async (id) => {
  const res = await fetch(`${BASE}/alquileres/${id}`);
  if (!res.ok) throw new Error('Alquiler no encontrado');
  return res.json();
};

export const crearAlquiler = async (data) => {
  const res = await fetch(`${BASE}/alquileres`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const devolverAlquiler = async (id, fechaDevolucion) => {
  const res = await fetch(`${BASE}/alquileres/${id}/devolver`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fechaDevolucion }),
  });
  return res.json();
};

export const cancelarAlquiler = async (id) => {
  const res = await fetch(`${BASE}/alquileres/${id}/cancelar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
};

export const eliminarAlquiler = async (id) => {
  const res = await fetch(`${BASE}/alquileres/${id}`, { method: 'DELETE' });
  return res.json();
};
