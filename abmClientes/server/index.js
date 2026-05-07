require('dotenv').config();
const app = require('./app');

async function main() {
  if (process.env.USE_JSON_DATA === 'true') {
    console.log('⚡ Modo JSON activado — sin conexión a base de datos');
  } else {
    const db = require('./models');
    await db.sequelize.sync();
    console.log('✅ Base de datos sincronizada');
  }

  await app.listen(app.get('port'));
  console.log(`🚀 Servidor corriendo en http://localhost:${app.get('port')}`);
}

main();
