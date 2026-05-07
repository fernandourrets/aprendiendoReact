'use strict';

const repo = require('../../services/repo/clientes');

// GET /api/clientes
const listar = async (req, res) => {
  try {
    const clientes = await repo.listar(req.query.search);
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// GET /api/clientes/:id
const obtener = async (req, res) => {
  try {
    const cliente = await repo.obtener(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// POST /api/clientes
const crear = async (req, res) => {
  try {
    const { dni, nombre, apellido, celular, email } = req.body;
    if (!dni || !nombre || !apellido) {
      return res.status(400).json({ error: 'dni, nombre y apellido son obligatorios' });
    }
    const cliente = await repo.crear({ dni, nombre, apellido, celular, email });
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// PUT /api/clientes/:id
const actualizar = async (req, res) => {
  try {
    const { dni, nombre, apellido, celular, email } = req.body;
    const cliente = await repo.actualizar(req.params.id, { dni, nombre, apellido, celular, email });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// DELETE /api/clientes/:id
const eliminar = async (req, res) => {
  try {
    const tieneAlquiler = await repo.tieneAlquilerActivo(req.params.id);
    if (tieneAlquiler) {
      return res.status(409).json({ error: 'El cliente tiene un alquiler activo, no se puede eliminar' });
    }
    const ok = await repo.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
