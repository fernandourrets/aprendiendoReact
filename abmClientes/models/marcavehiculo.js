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
      // define association here
     
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