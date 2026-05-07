'use strict';

const USE_JSON = process.env.USE_JSON_DATA === 'true';

if (USE_JSON) {
  // ── Implementación JSON ──────────────────────────────────────────────────────
  const { store, buildVehiculo, buildCatalogos, nextId } = require('./jsonStore');

  module.exports = {
    async listar(soloDisponibles) {
      let list = store.vehiculos.map(buildVehiculo);
      if (soloDisponibles) {
        const idsAlquilados = store.alquileres
          .filter((a) => a.estado === 'activo')
          .map((a) => a.vehiculoId);
        list = list.filter((v) => !idsAlquilados.includes(v.id));
      }
      return list;
    },

    async obtener(id) {
      const v = store.vehiculos.find((v) => v.id === Number(id));
      return v ? buildVehiculo(v) : null;
    },

    async crear(data) {
      const nuevo = { id: nextId(store.vehiculos), ...data };
      store.vehiculos.push(nuevo);
      return buildVehiculo(nuevo);
    },

    async actualizar(id, data) {
      const idx = store.vehiculos.findIndex((v) => v.id === Number(id));
      if (idx === -1) return null;
      store.vehiculos[idx] = { ...store.vehiculos[idx], ...data };
      return buildVehiculo(store.vehiculos[idx]);
    },

    async eliminar(id) {
      const idx = store.vehiculos.findIndex((v) => v.id === Number(id));
      if (idx === -1) return false;
      store.vehiculos.splice(idx, 1);
      return true;
    },

    async tieneAlquilerActivo(vehiculoId) {
      return store.alquileres.some(
        (a) => a.vehiculoId === Number(vehiculoId) && a.estado === 'activo'
      );
    },

    async listarCatalogos() {
      return buildCatalogos();
    },
  };
} else {
  // ── Implementación DB (Sequelize) ────────────────────────────────────────────
  const { Vehiculos, modeloVehiculo, marcaVehiculo, tipoVehiculo, Clientes, Alquiler } = require('../../models');

  const include = [
    { model: Clientes, as: 'cliente' },
    {
      model: modeloVehiculo,
      as: 'modelo',
      include: [{ model: marcaVehiculo, as: 'marca', include: [{ model: tipoVehiculo, as: 'tipo' }] }],
    },
  ];

  module.exports = {
    async listar(soloDisponibles) {
      let vehiculos = await Vehiculos.findAll({ include });
      if (soloDisponibles) {
        const alquilados = await Alquiler.findAll({ where: { estado: 'activo' }, attributes: ['vehiculoId'] });
        const ids = alquilados.map((a) => a.vehiculoId);
        vehiculos = vehiculos.filter((v) => !ids.includes(v.id));
      }
      return vehiculos;
    },

    async obtener(id) {
      return Vehiculos.findByPk(id, { include });
    },

    async crear(data) {
      return Vehiculos.create(data);
    },

    async actualizar(id, data) {
      const v = await Vehiculos.findByPk(id);
      if (!v) return null;
      return v.update(data);
    },

    async eliminar(id) {
      const v = await Vehiculos.findByPk(id);
      if (!v) return false;
      await v.destroy();
      return true;
    },

    async tieneAlquilerActivo(vehiculoId) {
      const a = await Alquiler.findOne({ where: { vehiculoId, estado: 'activo' } });
      return !!a;
    },

    async listarCatalogos() {
      return tipoVehiculo.findAll({
        include: [{ model: marcaVehiculo, as: 'marcas', include: [{ model: modeloVehiculo, as: 'modelos' }] }],
      });
    },
  };
}
