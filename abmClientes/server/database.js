// const mysql= require('mysql2');

// const{database}= require('./keys'); 



// class Database {
//   constructor() {
//     if (Database.instance) return Database.instance;

//     this.pool =database
    

//     Database.instance = mysql.createPool({
//       host: 'localhost',
//       user: ' Negrouz',
//       password: 'Urfe0307',
//       database: 'LavaderoWebApi',
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0
//     })
//   }

//   query(text, params) {
//     return this.pool.query(text, params);
//   }
// }
  
  //module.exports = new Database();


  const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: 3306
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('---!!! Conexión a la base de datos exitosa !!!---');
    } catch (error) {
        console.error('---!!! Error al conectarse a la base de datos !!!---: ', error);
    }
}

testConnection();

module.exports = sequelize;