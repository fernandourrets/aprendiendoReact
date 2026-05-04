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
      // define association here
      models.Clientes.hasMany(models.Vehiculos, {
        foreignKey: 'clienteId',
        as: 'vehiculos'
      });

        models.Vehiculos.belongsTo(models.Clientes, {
          foreignKey: 'clienteId',
          as: 'cliente'
        });

        models.Vehiculos.hasMany(models.modeloVehiculo, {
          foreignKey: 'modeloVehiculoId',
          as: 'modeloVehiculos'
        });
  
          models.modeloVehiculo.belongsTo(models.Vehiculos, {
            foreignKey: 'vehiculoId',
            as: 'vehiculo'
          });

        
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