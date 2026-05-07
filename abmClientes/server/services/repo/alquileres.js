'use strict';

const USE_JSON = process.env.USE_JSON_DATA === 'true';

if (USE_JSON) {
  // ── Implementación JSON ──────────────────────────────────────────────────────
  const { store, buildAlquiler, nextId } = require('./jsonStore');

  module.exports = {
    async listar(estado) {
      let list = estado
        ? store.alquileres.filter((a) => a.estado === estado)
        : [...store.alquileres];
      return list
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(buildAlquiler);
    },

    async obtener(id) {
      const a = store.alquileres.find((a) => a.id === Number(id));
      return a ? buildAlquiler(a) : null;
    },

    async vehiculoTieneAlquilerActivo(vehiculoId) {
      return store.alquileres.some(
        (a) => a.vehiculoId === Number(vehiculoId) && a.estado === 'activo'
      );
    },

    async crear(data) {
      const now = new Date().toISOString();
      const nuevo = {
        id: nextId(store.alquileres),
        ...data,
        estado: 'activo',
        fechaDevolucion: null,
        totalCalculado: null,
        createdAt: now,
        updatedAt: now,
      };
      store.alquileres.push(nuevo);
      return buildAlquiler(nuevo);
    },

    async devolver(id, fechaDevolucion) {
      const idx = store.alquileres.findIndex((a) => a.id === Number(id));
      if (idx === -1) return null;
      const a = store.alquileres[idx];
      if (a.estado !== 'activo') return { error: 'no_activo' };

      const fecha = fechaDevolucion || new Date().toISOString().split('T')[0];
      const dias = Math.max(
        1,
        Math.ceil((new Date(fecha) - new Date(a.fechaInicio)) / (1000 * 60 * 60 * 24))
      );
      store.alquileres[idx] = {
        ...a,
        fechaDevolucion: fecha,
        totalCalculado: parseFloat((dias * a.precioPorDia).toFixed(2)),
        estado: 'finalizado',
        updatedAt: new Date().toISOString(),
      };
      return buildAlquiler(store.alquileres[idx]);
    },

    async cancelar(id) {
      const idx = store.alquileres.findIndex((a) => a.id === Number(id));
      if (idx === -1) return null;
      if (store.alquileres[idx].estado !== 'activo') return { error: 'no_activo' };
      store.alquileres[idx] = { ...store.alquileres[idx], estado: 'cancelado', updatedAt: new Date().toISOString() };
      return buildAlquiler(store.alquileres[idx]);
    },

    async eliminar(id) {
      const idx = store.alquileres.findIndex((a) => a.id === Number(id));
      if (idx === -1) return null;
      if (store.alquileres[idx].estado === 'activo') return { error: 'activo' };
      store.alquileres.splice(idx, 1);
      return true;
    },
  };
} else {
  // ── Implementación DB (Sequelize) ────────────────────────────────────────────
  const { Alquiler, Clientes, Vehiculos, modeloVehiculo, marcaVehiculo } = require('../../models');

  const include = [
    { model: Clientes, as: 'cliente' },
    {
      model: Vehiculos,
      as: 'vehiculo',
      include: [{ model: modeloVehiculo, as: 'modelo', include: [{ model: marcaVehiculo, as: 'marca' }] }],
    },
  ];

  module.exports = {
    async listar(estado) {
      const where = estado ? { estado } : {};
      return Alquiler.findAll({ where, include, order: [['createdAt', 'DESC']] });
    },

    async obtener(id) {
      return Alquiler.findByPk(id, { include });
    },

    async vehiculoTieneAlquilerActivo(vehiculoId) {
      const a = await Alquiler.findOne({ where: { vehiculoId, estado: 'activo' } });
      return !!a;
    },

    async crear(data) {
      return Alquiler.create({ ...data, estado: 'activo' });
    },

    async devolver(id, fechaDevolucion) {
      const alquiler = await Alquiler.findByPk(id);
      if (!alquiler) return null;
      if (alquiler.estado !== 'activo') return { error: 'no_activo' };

      const fecha = fechaDevolucion || new Date().toISOString().split('T')[0];
      const dias = Math.max(
        1,
        Math.ceil((new Date(fecha) - new Date(alquiler.fechaInicio)) / (1000 * 60 * 60 * 24))
      );
      return alquiler.update({
        fechaDevolucion: fecha,
        totalCalculado: parseFloat((dias * alquiler.precioPorDia).toFixed(2)),
        estado: 'finalizado',
      });
    },

    async cancelar(id) {
      const alquiler = await Alquiler.findByPk(id);
      if (!alquiler) return null;
      if (alquiler.estado !== 'activo') return { error: 'no_activo' };
      return alquiler.update({ estado: 'cancelado' });
    },

    async eliminar(id) {
      const alquiler = await Alquiler.findByPk(id);
      if (!alquiler) return null;
      if (alquiler.estado === 'activo') return { error: 'activo' };
      await alquiler.destroy();
      return true;
    },
  };
}
