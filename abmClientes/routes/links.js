const { Router, json } = require('express');

const router = Router();  //ejecuta el metodo Router

const db = require('../dataBase'); // Importa la configuración de la base de datos
const { request } = require('../app');


router.get('/add',(request, response) => {
    response.send('negrooooooo')
    
})




 module.exports = router;