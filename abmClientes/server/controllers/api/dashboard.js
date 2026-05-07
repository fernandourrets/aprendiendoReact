'use strict';

const repo = require('../../services/repo/dashboard');

const obtenerMetricas = async (req, res) => {
  try {
    const metricas = await repo.obtenerMetricas();
    res.json(metricas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener métricas' });
  }
};

module.exports = { obtenerMetricas };
