'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Alquiler extends Model {
    static associate(models) {
      Alquiler.belongsTo(models.Clientes, { foreignKey: 'clienteId', as: 'cliente' });
      Alquiler.belongsTo(models.Vehiculos, { foreignKey: 'vehiculoId', as: 'vehiculo' });
    }
  }

  Alquiler.init({
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vehiculoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaFinPrevista: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaDevolucion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    precioPorDia: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalCalculado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('activo', 'finalizado', 'cancelado'),
      allowNull: false,
      defaultValue: 'activo',
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Alquiler',
    tableName: 'alquileres',
  });

  return Alquiler;
};
