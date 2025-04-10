const { get } = require('../routes/usuarioRoutes');
const contratoService = require('../services/contratoService');

async function getDadosContrato(req, resposta) {
    const contratos = await contratoService.pesquisarContrato();
    resposta.json(contratos);
};

async function getContratosExpirando(req, resposta) {
    const { data_termino } = req.body;
    try {
        const data = await contratoService.pesquisarContratosExpirando(data_termino);

        if (!data) {
            return resposta.status(404).json({ mensagem: 'Nenhum contrato encontrado' });
        }
        resposta.json(data);

    } catch (erro) {
        console.error('Erro ao obter contratos: ', erro);
        resposta.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

module.exports = {getDadosContrato, getContratosExpirando};