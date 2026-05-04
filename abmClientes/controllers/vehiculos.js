
 const { getTablas } = require('../services/clienteVehiculosService');


  async function obtenerTablas(request, response) {
    try {

        //const tipoVehi = await getTablas();
        

        const marcaModelo = await getTablas();
        

        
        //return response.status(201).json({ "Cliente:": nuevoCliente });
        return response.render('nuevoCliente.ejs', { marcaModelo });
        


    } catch (error) {
        console.error(error);
        return response.status(400).json("Error al obtener las tablas");
    }
}





 module.exports= {obtenerTablas}