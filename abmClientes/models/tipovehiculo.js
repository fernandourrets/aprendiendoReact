'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipoVehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  tipoVehiculo.init({
    tipoVehiculo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipoVehiculo',
    tableName: 'tipoVehiculos'
  });
  return tipoVehiculo;
};