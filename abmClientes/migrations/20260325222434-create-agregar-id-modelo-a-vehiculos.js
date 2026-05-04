'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Vehiculos', 'modeloVehiculoId', 'INTEGER');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('agregarIdModeloAVehiculos');
  }
};