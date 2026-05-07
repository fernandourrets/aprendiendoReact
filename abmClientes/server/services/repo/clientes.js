'use strict';

const USE_JSON = process.env.USE_JSON_DATA === 'true';

if (USE_JSON) {
  // ── Implementación JSON ──────────────────────────────────────────────────────
  const { store, buildCliente, nextId } = require('./jsonStore');

  module.exports = {
    async listar(search) {
      let list = store.clientes.map(buildCliente);
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(
          (c) =>
            c.nombre.toLowerCase().includes(s) ||
            c.apellido.toLowerCase().includes(s) ||
            String(c.dni).includes(s) ||
            (c.email && c.email.toLowerCase().includes(s))
        );
      }
      return list;
    },

    async obtener(id) {
      const c = store.clientes.find((c) => c.id === Number(id));
      return c ? buildCliente(c) : null;
    },

    async crear(data) {
      const nuevo = { id: nextId(store.clientes), ...data };
      store.clientes.push(nuevo);
      return buildCliente(nuevo);
    },

    async actualizar(id, data) {
      const idx = store.clientes.findIndex((c) => c.id === Number(id));
      if (idx === -1) return null;
      store.clientes[idx] = { ...store.clientes[idx], ...data };
      return buildCliente(store.clientes[idx]);
    },

    async eliminar(id) {
      const idx = store.clientes.findIndex((c) => c.id === Number(id));
      if (idx === -1) return false;
      store.clientes.splice(idx, 1);
      return true;
    },

    async tieneAlquilerActivo(clienteId) {
      return store.alquileres.some(
        (a) => a.clienteId === Number(clienteId) && a.estado === 'activo'
      );
    },
  };
} else {
  // ── Implementación DB (Sequelize) ────────────────────────────────────────────
  const { Clientes, Vehiculos, modeloVehiculo, marcaVehiculo, tipoVehiculo, Alquiler } = require('../../models');
  const { Op } = require('sequelize');

  const include = [
    {
      model: Vehiculos,
      as: 'vehiculos',
      include: [
        {
          model: modeloVehiculo,
          as: 'modelo',
          include: [{ model: marcaVehiculo, as: 'marca', include: [{ model: tipoVehiculo, as: 'tipo' }] }],
        },
      ],
    },
  ];

  module.exports = {
    async listar(search) {
      const where = search
        ? {
            [Op.or]: [
              { nombre: { [Op.like]: `%${search}%` } },
              { apellido: { [Op.like]: `%${search}%` } },
              { dni: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } },
            ],
          }
        : {};
      return Clientes.findAll({ where, include });
    },

    async obtener(id) {
      return Clientes.findByPk(id, { include });
    },

    async crear(data) {
      return Clientes.create(data);
    },

    async actualizar(id, data) {
      const cliente = await Clientes.findByPk(id);
      if (!cliente) return null;
      return cliente.update(data);
    },

    async eliminar(id) {
      const cliente = await Clientes.findByPk(id);
      if (!cliente) return false;
      await cliente.destroy();
      return true;
    },

    async tieneAlquilerActivo(clienteId) {
      const a = await Alquiler.findOne({ where: { clienteId, estado: 'activo' } });
      return !!a;
    },
  };
}
