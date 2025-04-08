const contratoService = require('../services/contratoService');

async function getDadosContrato(req, resposta) {
    const contratos = await contratoService.pesquisarContrato();
    resposta.json(contratos);
};

module.exports = {getDadosContrato};