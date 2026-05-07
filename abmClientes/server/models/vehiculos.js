'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehiculos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehiculos.belongsTo(models.Clientes, { foreignKey: 'clienteId', as: 'cliente' });
      Vehiculos.belongsTo(models.modeloVehiculo, { foreignKey: 'modeloVehiculoId', as: 'modelo' });
      Vehiculos.hasMany(models.Alquiler, { foreignKey: 'vehiculoId', as: 'alquileres' });
    }
  }
  Vehiculos.init({
    año: DataTypes.INTEGER,
    patente: DataTypes.STRING,
    clienteId: DataTypes.INTEGER,
    modeloVehiculoId: DataTypes.INTEGER
  },
   {
    modelName: 'Vehiculos',
    sequelize,
    tableName: 'vehiculos',
  });
  return Vehiculos;
};