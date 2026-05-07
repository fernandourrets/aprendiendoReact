'use strict';

const { Router } = require('express');
const { listarTipos } = require('../../controllers/api/vehiculos');
const router = Router();

// GET /api/catalogos/tipos  — tipos con marcas y modelos anidados
router.get('/tipos', listarTipos);

module.exports = router;
