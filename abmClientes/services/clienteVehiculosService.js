
const { Clientes, Vehiculos, marcaVehiculo,tipoVehiculo,modeloVehiculo } = require('../models');
const { Op, where } = require("sequelize");

async function getTablas() {

  // tipoVehi= await tipoVehiculo.findAll({
    
  //   attributes: ['tipoVehiculo'],
  // });


  const marcaModelo = await marcaVehiculo.findAll({
    attributes: ['id','marcaVehiculo'],
    include: [{
      model: modeloVehiculo,
      attributes: ['id','modeloVehiculo'],
      as:'modeloVehiculos'
      
    }]
   });

 
  // const marcaVehi= await marcaVehiculo.findAll({
    
  //   attributes: ['marcaVehiculo']
 
    
  // });

  return  marcaModelo;

}







async function verificarBusqueda(busqueda) {
  if (!busqueda) {
    return false

  } else {
    return true
  }
}


async function verificarCliente(dataCliente) {
  const { dni, nombre, apellido, email, celular } = dataCliente;
  if (!dni || !nombre || !apellido || !email || !celular || !email.includes("@")) {
    return false

  } else {
    return true
  }

}

async function verificarVehiculo(dataVehiculo) {
  const { patente, modelo, año } = dataVehiculo;
  if (!patente || !modelo || !año) {
    return false

  } else {
    return true
  }

}


async function setEdicion(busqueda) {
  
  const cp = await Clientes.findOne({
    where: {
      [Op.or]: [
        { dni: busqueda },
        { apellido: { [Op.like]: `%${busqueda}%` } },
        { nombre: { [Op.like]: `%${busqueda}%` } },
        { celular: busqueda },
        { email: { [Op.like]: `%${busqueda}%` } }
        
      ]
    },
      include:[{
      model: Vehiculos,
      as: 'vehiculos',

      required: false
    }]
  });

  console.log(cp);
  return cp;  

}






async function setClienteVehiculo(dataCliente, dataVehiculo) {
  const { patente, modelo, año } = dataVehiculo;
  const { dni, nombre, apellido, email, celular } = dataCliente;

  

  const cli = await Clientes.create(
    {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        email: email,
        celular: celular
    }
);

const cliId = cli.id; // Obtener el ID del cliente recién creado

const vehi = await Vehiculos.create({


    patente: patente,
    año: año,
    clienteId: cliId,
    modeloVehiculoId: modelo

  });

  console.log(cli, vehi);
  return cli, vehi;
}







module.exports = {
  setClienteVehiculo, verificarCliente, verificarVehiculo, setEdicion, verificarBusqueda,getTablas
};