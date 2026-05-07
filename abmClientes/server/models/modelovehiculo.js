'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class modeloVehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      modeloVehiculo.belongsTo(models.marcaVehiculo, { foreignKey: 'marcaVehiculoId', as: 'marca' });
      modeloVehiculo.hasMany(models.Vehiculos, { foreignKey: 'modeloVehiculoId', as: 'vehiculos' });
    }
  }
  modeloVehiculo.init({
    modeloVehiculo: DataTypes.STRING,
    marcaVehiculoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'modeloVehiculo',
    tableName: 'modeloVehiculos'
  });
  return modeloVehiculo;
};