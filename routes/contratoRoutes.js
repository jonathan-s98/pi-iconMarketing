const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');

router.post('/contratos', contratoController.cadastrarNovoContrato);
router.get('/contratos', contratoController.getDadosContrato);
router.get('/contratos:data', contratoController.getContratosExpirando);
router.put('/contratos:id', contratoController.atualizarContrato);

module.exports = router;