const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');

router.get('/contratos', contratoController.getDadosContrato);
router.get('/contratos:data', contratoController.getContratosExpirando);

module.exports = router;