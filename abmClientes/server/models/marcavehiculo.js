'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class marcaVehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      marcaVehiculo.belongsTo(models.tipoVehiculo, { foreignKey: 'tipoVehiculoId', as: 'tipo' });
      marcaVehiculo.hasMany(models.modeloVehiculo, { foreignKey: 'marcaVehiculoId', as: 'modelos' });
    }
  }
  marcaVehiculo.init({
    marcaVehiculo: DataTypes.STRING,
    tipoVehiculoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'marcaVehiculo',
    tableName: 'marcaVehiculos',
  });
  return marcaVehiculo;
};