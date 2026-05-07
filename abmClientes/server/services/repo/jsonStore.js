'use strict';

// Carga los datos mock y los mantiene en memoria durante la sesión.
// Los cambios (POST/PUT/DELETE) persisten mientras el servidor esté corriendo,
// pero se reinician al reiniciar el proceso (comportamiento esperado en modo demo).

const rawData = require('../../data/mock/db.json');
const store = JSON.parse(JSON.stringify(rawData)); // deep clone

function buildModelo(modeloVehiculoId) {
  const modelo = store.modeloVehiculos.find((m) => m.id === modeloVehiculoId) || null;
  if (!modelo) return null;
  const marca = store.marcaVehiculos.find((m) => m.id === modelo.marcaVehiculoId) || null;
  const tipo = marca ? store.tipoVehiculos.find((t) => t.id === marca.tipoVehiculoId) || null : null;
  return { ...modelo, marca: marca ? { ...marca, tipo } : null };
}

function buildVehiculo(v) {
  return { ...v, modelo: buildModelo(v.modeloVehiculoId) };
}

function buildCliente(c) {
  const vehiculos = store.vehiculos.filter((v) => v.clienteId === c.id).map(buildVehiculo);
  return { ...c, vehiculos };
}

function buildAlquiler(a) {
  const cliente = store.clientes.find((c) => c.id === a.clienteId) || null;
  const vehiculoRaw = store.vehiculos.find((v) => v.id === a.vehiculoId) || null;
  return { ...a, cliente, vehiculo: vehiculoRaw ? buildVehiculo(vehiculoRaw) : null };
}

function buildCatalogos() {
  return store.tipoVehiculos.map((tipo) => ({
    ...tipo,
    marcas: store.marcaVehiculos
      .filter((m) => m.tipoVehiculoId === tipo.id)
      .map((marca) => ({
        ...marca,
        modelos: store.modeloVehiculos.filter((mo) => mo.marcaVehiculoId === marca.id),
      })),
  }));
}

function nextId(collection) {
  return Math.max(...collection.map((r) => r.id), 0) + 1;
}

module.exports = { store, buildVehiculo, buildCliente, buildAlquiler, buildCatalogos, nextId };
