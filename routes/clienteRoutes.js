const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//Defina a rota para obter os dados
router.post('/clientes', clienteController.cadastrarNovoCliente);
router.get('/clientes', clienteController.getDadosCliente);
router.get('/clientes/contratos=status', clienteController.getStatusContrato);
router.get('/clientes/contratos=qtde', clienteController.getQtdeContratos);
router.put('/clientes:id', clienteController.atualizarCliente);
router.get('/clientes:cnpj', clienteController.getClientePorCNPJ);

module.exports = router;