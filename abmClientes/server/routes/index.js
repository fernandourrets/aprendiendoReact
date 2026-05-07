
const { Router, json } = require('express');
const {registrarClienteVehiculo, buscarClienteVehiculo}= require('../controllers/clientes') //importa el modulo print
const {obtenerTablas}= require('../controllers/vehiculos')
const router = Router();  //ejecuta el metodo Router




//const registrarClienteVehiculo= require('../controllers/clientes'); //importa el modulo vehiculos
//const { registrarClienteVehiculo, buscarClienteVehiculo } = require('../controllers/clientes'); 

    

//const nC = []; //array vacio para guardar los clientes


router.get('/nuevoCliente', async(request, response) => {   //ruta raiz

    
    await obtenerTablas(request,response)
    




})

router.get('/nuevoLavado', (request, response) => {   //ruta raiz

    response.render('nuevoLavado.ejs');  //renderiza la vista nuevoCliente.ejs





})

router.get('/buscarClienteVehiculo', (request, response) => {   //ruta raiz

    response.render('buscarClienteVehiculo.ejs');  //renderiza la vista nuevoCliente.ejs





})


router.post('/buscarClienteVehiculo', async(request, response) => {
    await buscarClienteVehiculo(request,response)
 })



router.post('/nuevoCliente', async(request, response) => {   //ruta raiz

   

//const data= nC.push(request.body);  // Guarda el cuerpo del formulario en el array




   


    //console.log(data);  //muestra en consola el cuerpo del formulario
    //console.log(nC);  //muestra en consola el array de clientes
    //res.send('info recibida correctamente!!!') //envia respuesta al cliente

    

    

 
    
    await registrarClienteVehiculo(request,response)  // Llama a la función guardar, pasando la solicitud y la respuesta
    
    
    
    
 
    

    

})



router.get('/editarClienteVehiculo', async(request, response) => { 
    //await buscarClienteVehiculo(request,response)
    response.render('editarClienteVehiculo.ejs');
})
















    module.exports = router //Exporta el modulo a index.js!!!