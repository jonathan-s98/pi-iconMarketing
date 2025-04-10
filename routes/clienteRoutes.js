const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//Defina a rota para obter os dados
router.get('/clientes', clienteController.getDadosCliente);
router.get('/clientes/contratos=status', clienteController.getStatusContrato);
router.get('/clientes/contratos=qtde', clienteController.getQtdeContratos);

module.exports = router;