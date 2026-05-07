const BASE = '/api';

export const getDashboard = async () => {
  const res = await fetch(`${BASE}/dashboard`);
  if (!res.ok) throw new Error('Error al obtener métricas');
  return res.json();
};
