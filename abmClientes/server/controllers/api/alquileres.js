'use strict';

const repo = require('../../services/repo/alquileres');

// GET /api/alquileres
const listar = async (req, res) => {
  try {
    const alquileres = await repo.listar(req.query.estado);
    res.json(alquileres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener alquileres' });
  }
};

// GET /api/alquileres/:id
const obtener = async (req, res) => {
  try {
    const alquiler = await repo.obtener(req.params.id);
    if (!alquiler) return res.status(404).json({ error: 'Alquiler no encontrado' });
    res.json(alquiler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener alquiler' });
  }
};

// POST /api/alquileres
const crear = async (req, res) => {
  try {
    const { clienteId, vehiculoId, fechaInicio, fechaFinPrevista, precioPorDia, observaciones } = req.body;

    if (!clienteId || !vehiculoId || !fechaInicio || !fechaFinPrevista || !precioPorDia) {
      return res.status(400).json({
        error: 'clienteId, vehiculoId, fechaInicio, fechaFinPrevista y precioPorDia son obligatorios',
      });
    }
    if (new Date(fechaFinPrevista) <= new Date(fechaInicio)) {
      return res.status(400).json({ error: 'fechaFinPrevista debe ser posterior a fechaInicio' });
    }

    const ocupado = await repo.vehiculoTieneAlquilerActivo(vehiculoId);
    if (ocupado) {
      return res.status(409).json({ error: 'El vehiculo ya tiene un alquiler activo' });
    }

    const alquiler = await repo.crear({ clienteId, vehiculoId, fechaInicio, fechaFinPrevista, precioPorDia, observaciones });
    res.status(201).json(alquiler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear alquiler' });
  }
};

// PUT /api/alquileres/:id/devolver
const devolver = async (req, res) => {
  try {
    const result = await repo.devolver(req.params.id, req.body.fechaDevolucion);
    if (!result) return res.status(404).json({ error: 'Alquiler no encontrado' });
    if (result.error === 'no_activo') return res.status(409).json({ error: 'El alquiler ya fue finalizado o cancelado' });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar devolucion' });
  }
};

// PUT /api/alquileres/:id/cancelar
const cancelar = async (req, res) => {
  try {
    const result = await repo.cancelar(req.params.id);
    if (!result) return res.status(404).json({ error: 'Alquiler no encontrado' });
    if (result.error === 'no_activo') return res.status(409).json({ error: 'El alquiler ya fue finalizado o cancelado' });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cancelar alquiler' });
  }
};

// DELETE /api/alquileres/:id
const eliminar = async (req, res) => {
  try {
    const result = await repo.eliminar(req.params.id);
    if (!result) return res.status(404).json({ error: 'Alquiler no encontrado' });
    if (result.error === 'activo') return res.status(409).json({ error: 'No se puede eliminar un alquiler activo. Cancelalo primero.' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar alquiler' });
  }
};

module.exports = { listar, obtener, crear, devolver, cancelar, eliminar };

