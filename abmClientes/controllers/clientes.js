const { request } = require("express");
const {
  setClienteVehiculo,
  setEdicion,
  verificarCliente,
  verificarVehiculo,
  verificarBusqueda,
} = require("../services/clienteVehiculosService");

async function registrarClienteVehiculo(request, response) {
  try {
    const { dni, nombre, apellido, email, celular, patente, modelo, año } =
      request.body;

    const dataCliente = { dni, nombre, apellido, email, celular };

    const dataVehiculo = { patente, modelo, año };

    const clienteOk = await verificarCliente(dataCliente);
    const vehiculoOk = await verificarVehiculo(dataVehiculo);

    if (clienteOk === false && vehiculoOk === false) {
      return response.status(400).json({
        ok: false,
        error: "Todos los campos son obligatorios o el email no es válido",
      });
    } else {
      console.log("Datos del cliente verificados correctamente...");
      const nuevoCliente = await setClienteVehiculo(dataCliente, dataVehiculo);
      console.log("Cliente y vehículo registrados correctamente...");
      return response.status(201).json({ "Cliente:": nuevoCliente });
    }
  } catch (error) {
    console.error(error);
    return response.status(400).json("Error al guardar los datos");
  }
}

async function buscarClienteVehiculo(request, response) {
  try {
    const { busqueda } = request.body;

    const clienteOk = await verificarBusqueda(busqueda);

    if (clienteOk === false) {
      return response.status(400).json({
        ok: false,
        error: "Complete al menos un campo por favor...",
      });
    } else {
      console.log("Datos verificados correctamente...");
      const cp = await setEdicion(busqueda);

      if (cp.length == 0) {
        return response
          .status(404)
          .json({ error: "No se encontraron resultados para la búsqueda" });
      } else {
        //return response.status(200).json({ "Cliente y vehículo encontrados:": cp });
        console.log(cp.vehiculos);
        return response.render("editarClienteVehiculo.ejs", { cp });
        //return response.status(201).json({ "Cliente:": nuevoCliente });
      }
    }
  } catch (error) {
    console.error(error);
    return response.status(400).json({ error: "Error al guardar los datos" });
  }
}

module.exports = {
  registrarClienteVehiculo,
  buscarClienteVehiculo,
  verificarCliente,
  verificarVehiculo,
  setClienteVehiculo,
  setEdicion,
};
