'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const basename = path.basename(__filename);
const db = {};

//  CONFIGURÁ TU BASE DE DATOS ACÁ
const sequelize = new Sequelize('lavaderowebapi', 'pretouz', 'Urfe0307', {
  host: 'localhost',
  dialect: 'mysql', // o 'mariadb'
  logging: false
});

//  CARGA AUTOMÁTICA DE MODELOS
fs.readdirSync(__dirname)
  .filter(file => {
    return file !== basename && file.endsWith('.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

//  ASOCIACIONES
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;