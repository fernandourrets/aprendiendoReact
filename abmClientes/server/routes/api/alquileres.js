'use strict';

const { Router } = require('express');
const ctrl = require('../../controllers/api/alquileres');
const router = Router();

router.get('/', ctrl.listar);
router.get('/:id', ctrl.obtener);
router.post('/', ctrl.crear);
router.put('/:id/devolver', ctrl.devolver);
router.put('/:id/cancelar', ctrl.cancelar);
router.delete('/:id', ctrl.eliminar);

module.exports = router;
