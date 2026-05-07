'use strict';

const { Router } = require('express');
const ctrl = require('../../controllers/api/dashboard');
const router = Router();

router.get('/', ctrl.obtenerMetricas);

module.exports = router;
