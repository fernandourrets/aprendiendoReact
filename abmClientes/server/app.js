require('dotenv').config();
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
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});



//Routes

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/clientes', require('./routes/api/clientes'));
app.use('/api/vehiculos', require('./routes/api/vehiculos'));
app.use('/api/alquileres', require('./routes/api/alquileres'));
app.use('/api/catalogos', require('./routes/api/catalogos'));
app.use('/api/dashboard', require('./routes/api/dashboard'));

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
