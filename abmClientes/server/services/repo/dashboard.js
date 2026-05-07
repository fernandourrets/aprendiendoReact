'use strict';

const USE_JSON = process.env.USE_JSON_DATA === 'true';

if (USE_JSON) {
  const { store } = require('./jsonStore');

  module.exports = {
    async obtenerMetricas() {
      const ahora = new Date();
      const anio = ahora.getFullYear();
      const mes = ahora.getMonth(); // 0-based

      const alquileres = store.alquileres;

      // Activos
      const alquileresActivos = alquileres.filter((a) => a.estado === 'activo').length;

      // Ingresos del mes (finalizados con fechaDevolucion en el mes actual)
      const ingresosDelMes = alquileres
        .filter((a) => {
          if (a.estado !== 'finalizado' || !a.fechaDevolucion || !a.totalCalculado) return false;
          const d = new Date(a.fechaDevolucion);
          return d.getFullYear() === anio && d.getMonth() === mes;
        })
        .reduce((sum, a) => sum + Number(a.totalCalculado), 0);

      // Alquileres iniciados este mes
      const alquileresDelMes = alquileres.filter((a) => {
        const d = new Date(a.fechaInicio);
        return d.getFullYear() === anio && d.getMonth() === mes;
      }).length;

      // Próximas devoluciones: fechaFinPrevista <= hoy y estado activo
      const hoyStr = ahora.toISOString().split('T')[0];
      const proximasVencidas = alquileres.filter((a) => {
        return a.estado === 'activo' && a.fechaFinPrevista <= hoyStr;
      }).length;

      const totalClientes = store.clientes.length;
      const totalVehiculos = store.vehiculos.length;

      const idsAlquilados = alquileres
        .filter((a) => a.estado === 'activo')
        .map((a) => a.vehiculoId);
      const vehiculosDisponibles = store.vehiculos.filter(
        (v) => !idsAlquilados.includes(v.id)
      ).length;

      return {
        alquileresActivos,
        ingresosDelMes: parseFloat(ingresosDelMes.toFixed(2)),
        alquileresDelMes,
        proximasVencidas,
        totalClientes,
        totalVehiculos,
        vehiculosDisponibles,
      };
    },
  };
} else {
  const { Alquiler, Clientes, Vehiculos } = require('../../models');
  const { Op } = require('sequelize');

  module.exports = {
    async obtenerMetricas() {
      const ahora = new Date();
      const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
      const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0, 23, 59, 59);

      const [
        alquileresActivos,
        alquileresDelMes,
        ingresosRow,
        proximasVencidas,
        totalClientes,
        totalVehiculos,
        vehiculosConAlquilerActivo,
      ] = await Promise.all([
        Alquiler.count({ where: { estado: 'activo' } }),
        Alquiler.count({ where: { fechaInicio: { [Op.between]: [inicioMes, finMes] } } }),
        Alquiler.findAll({
          where: {
            estado: 'finalizado',
            fechaDevolucion: { [Op.between]: [inicioMes, finMes] },
            totalCalculado: { [Op.not]: null },
          },
          attributes: ['totalCalculado'],
        }),
        Alquiler.count({
          where: {
            estado: 'activo',
            fechaFinPrevista: { [Op.lte]: ahora },
          },
        }),
        Clientes.count(),
        Vehiculos.count(),
        Alquiler.count({ where: { estado: 'activo' } }),
      ]);

      const ingresosDelMes = ingresosRow.reduce(
        (sum, a) => sum + Number(a.totalCalculado),
        0
      );

      return {
        alquileresActivos,
        ingresosDelMes: parseFloat(ingresosDelMes.toFixed(2)),
        alquileresDelMes,
        proximasVencidas,
        totalClientes,
        totalVehiculos,
        vehiculosDisponibles: totalVehiculos - vehiculosConAlquilerActivo,
      };
    },
  };
}
