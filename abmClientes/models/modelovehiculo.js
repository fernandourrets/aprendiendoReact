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
      // define association here
      models.marcaVehiculo.hasMany(models.modeloVehiculo, {
        foreignKey: 'marcaVehiculoId',
        as: 'modeloVehiculos'
      });

        models.modeloVehiculo.belongsTo(models.marcaVehiculo,{
          foreignKey: 'marcaVehiculoId',
          as: 'marcaVehiculo'
        });
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