const nivelService = require('../services/nivelService');

async function cadastrarNovoNivel(req, res) {
    const { nome_nivel, descricao } = req.body;

    if (!nome_nivel || !descricao) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos' });
    }

    try {
        const sucesso = await nivelService.cadastrarNivel(nome_nivel, descricao);

        if (sucesso) {
            res.status(201).json({ mensagem: 'Nível cadastrado com sucesso' });
        } else {
            res.status(500).json({ mensagem: 'Não foi possível cadastrar o nível' });
        }
    } catch (erro) {
        console.error('Erro ao cadastrar nível:', erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function getDadosNivel(req, resposta) {
    const nivelAcesso = await nivelService.pesquisarNiveldeAcesso();
    resposta.json(nivelAcesso);
};

module.exports = {cadastrarNovoNivel, getDadosNivel};