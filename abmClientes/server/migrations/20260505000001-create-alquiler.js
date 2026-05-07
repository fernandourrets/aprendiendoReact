'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alquileres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      vehiculoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'vehiculos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fechaFinPrevista: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fechaDevolucion: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      precioPorDia: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      totalCalculado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      estado: {
        type: Sequelize.ENUM('activo', 'finalizado', 'cancelado'),
        allowNull: false,
        defaultValue: 'activo',
      },
      observaciones: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alquileres');
  },
};
