const { get } = require('../routes/usuarioRoutes');
const contratoService = require('../services/contratoService');

async function cadastrarNovoContrato(req, res) {
    const { nome_arquivo, caminho_arquivo, data_envio, status_contrato, data_inicio, data_termino } = req.body;

    if (!nome_arquivo || !caminho_arquivo || !data_envio || !status_contrato || !data_inicio || !data_termino) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos' });
    }

    try {
        const sucesso = await contratoService.cadastrarContrato(nome_arquivo, caminho_arquivo, data_envio, status_contrato, data_inicio, data_termino);

        if (sucesso) {
            res.status(201).json({ mensagem: 'Contrato cadastrado com sucesso' });
        } else {
            res.status(500).json({ mensagem: 'Não foi possível cadastrar o contrato' });
        }
    } catch (erro) {
        console.error('Erro ao cadastrar contrato:', erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function getDadosContrato(req, resposta) {
    const contratos = await contratoService.pesquisarContrato();
    resposta.json(contratos);
}

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
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function atualizarContrato(req, resposta) {
    const { id, nome_arquivo, caminho_arquivo, data_envio, status_contrato, data_inicio, data_termino } = req.body;
    try {
        const atualizar = await contratoService.atualizarContrato(id, nome_arquivo, caminho_arquivo, data_envio, status_contrato, data_inicio, data_termino);

        if (atualizar) {
            resposta.json({ mensagem: 'Contrato atualizado com sucesso' });
        } else {
            resposta.status(404).json({ mensagem: 'Contrato não encontrado' });
        }

    } catch (erro) {
        console.error('Erro ao atualizar contrato:', erro);
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = {cadastrarNovoContrato, getDadosContrato, getContratosExpirando, atualizarContrato};