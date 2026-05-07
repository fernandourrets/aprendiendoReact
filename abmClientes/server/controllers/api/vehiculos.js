'use strict';

const repo = require('../../services/repo/vehiculos');

// ──────────────────────────────────────────────────────────────────────────────

// GET /api/vehiculos
const listar = async (req, res) => {
  try {
    const vehiculos = await repo.listar(req.query.disponibles === 'true');
    res.json(vehiculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener vehiculos' });
  }
};

// GET /api/vehiculos/:id
const obtener = async (req, res) => {
  try {
    const vehiculo = await repo.obtener(req.params.id);
    if (!vehiculo) return res.status(404).json({ error: 'Vehiculo no encontrado' });
    res.json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener vehiculo' });
  }
};

// POST /api/vehiculos
const crear = async (req, res) => {
  try {
    const { año, patente, clienteId, modeloVehiculoId } = req.body;
    if (!patente || !modeloVehiculoId) {
      return res.status(400).json({ error: 'patente y modeloVehiculoId son obligatorios' });
    }
    const vehiculo = await repo.crear({ año, patente, clienteId, modeloVehiculoId });
    res.status(201).json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear vehiculo' });
  }
};

// PUT /api/vehiculos/:id
const actualizar = async (req, res) => {
  try {
    const { año, patente, clienteId, modeloVehiculoId } = req.body;
    const vehiculo = await repo.actualizar(req.params.id, { año, patente, clienteId, modeloVehiculoId });
    if (!vehiculo) return res.status(404).json({ error: 'Vehiculo no encontrado' });
    res.json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar vehiculo' });
  }
};

// DELETE /api/vehiculos/:id
const eliminar = async (req, res) => {
  try {
    const tieneAlquiler = await repo.tieneAlquilerActivo(req.params.id);
    if (tieneAlquiler) {
      return res.status(409).json({ error: 'El vehiculo tiene un alquiler activo, no se puede eliminar' });
    }
    const ok = await repo.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Vehiculo no encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar vehiculo' });
  }
};

// GET /api/catalogos/tipos
const listarTipos = async (req, res) => {
  try {
    const tipos = await repo.listarCatalogos();
    res.json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener tipos de vehiculo' });
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar, listarTipos };

