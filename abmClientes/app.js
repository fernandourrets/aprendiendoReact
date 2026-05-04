const express = require('express')
const morgan = require('morgan')
const app= express()
const path = require('path')



//Settings

app.set('port', 3000);
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs'); //motor de plantilla ejs



//Middlewares --(funciones intermedias que se ejecutan antes de llegar a las rutas)

app.use(morgan('dev')); //metodo dev significa que se mostrara en consola las peticiones que se hagan al servidor
app.use(express.urlencoded({extended:false})); //para que entienda los datos que vienen de un formulario/extended false sig que solo acepta datos en string que viene desde el formulario completado por un cliente => los pasa a json automaticamente
//app.use(require('./views/loggin.ejs')) //middleware para loggear usuarios
app.use(express.json()) //para que entienda los datos que vienen en formato json (desde postman por ejemplo) y los convierta a objetos de javascript automaticamente.



//Routes

app.use(require('./routes/index')); //carga las rutas del archivo index.js de la carpeta routes
app.use(require('./routes/authentication')) // idem anterior 
app.use('/links', require('./routes/links')) // idem anterior + prefijo /links para las rutas que se encuentren en el archivo links.js de la carpeta routes


//static files

app.use(express.static(path.join(__dirname, '/public'))); //archivos estaticos (css, js, imagenes) en la carpeta public


//404 handler

app.use((request, response, next) => {
    response.status(404).send('404 Not Found'); //renderiza la vista 404.ejs en caso de que no se encuentre la ruta
})











module.exports = app;  //Exporta el modulo a index.js!!!
