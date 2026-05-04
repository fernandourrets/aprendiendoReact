
const app= require('./app');

const db = require('./models'); // Importa la instancia de Sequelize

async function main(){
    
    await db.sequelize.sync(); // Sincroniza los modelos con la base de datos
    await app.listen(app.get('port'));
    console.log('Server listening on port', app.get('port'));
}

main();