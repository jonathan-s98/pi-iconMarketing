const clienteService = require ('../services/clienteService');

/*Após executar a query SQL por meio do script clienteService.js, os dados serão retornados, isto é, os dados dos clientes que estejam cadastrados no banco de dados.
Assim, para que seja possível visualizá-los, serão retornados no formato json*/

async function cadastrarNovoCliente(req, res) {
    const { nome_fantasia, razao_social, cnpj, segmento, telefone, site, id_usuario } = req.body;

    if (!nome_fantasia || !razao_social || !cnpj || !segmento || !telefone || !site || !id_usuario) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos' });
    }

    try {
        const sucesso = await clienteService.cadastrarCliente(nome_fantasia, razao_social, cnpj, segmento, telefone, site, id_usuario);

        if (sucesso) {
            res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso' });
        } else {
            res.status(500).json({ mensagem: 'Não foi possível cadastrar o cliente' });
        }
    } catch (erro) {
        console.error('Erro ao cadastrar cliente:', erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function getDadosCliente(req, resposta) {
    try{
        const clientes = await clienteService.pesquisarCliente();

        if (!clientes) {
            return resposta.status(404).json({ mensagem: 'Nenhum cliente encontrado' });
        }
        resposta.json(clientes);

    } catch (erro) {
        console.error('Erro ao obter dados do cliente:', erro);
        resposta.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

async function getStatusContrato(req, resposta) {
    const { status_contrato } = req.body;
    try{
        const status = await clienteService.statusContrato(status_contrato);

        if (!status) {
            return resposta.status(404).json({ mensagem: 'Nenhum contrato encontrado' });
        }
        resposta.json(status);

    } catch (erro) {
        console.error('Erro ao obter status do contrato:', erro);
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function getQtdeContratos(req, resposta) {
    try{
        const qtde = await clienteService.quantidadeContratos();
        resposta.json(qtde);

    } catch (erro) {
        console.error('Erro ao obter quantidade de contratos:', erro);
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function atualizarCliente(req, resposta) {
    const { id, nome_fantasia, razao_social, cnpj, segmento, telefone, site } = req.body;
    try{
        const atualizar = await clienteService.atualizarCliente(id, nome_fantasia, razao_social, cnpj, segmento, telefone, site);

        if (atualizar) {
            resposta.json({ mensagem: 'Cliente atualizado com sucesso' });
        } else {
            resposta.status(404).json({ mensagem: 'Cliente não encontrado' });
        }
    } catch (erro) {
        console.error('Erro ao atualizar cliente:', erro);
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function getClientePorCNPJ(req, resposta) {
    const { cnpj } = req.body;
    try{
        const cliente = await clienteService.pesquisarClientePorCNPJ(cnpj);

        if (!cliente) {
            return resposta.status(404).json({ mensagem: 'Nenhum cliente encontrado' });
        }
        resposta.json(cliente);

    } catch (erro) {
        console.error('Erro ao obter cliente:', erro);
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = {cadastrarNovoCliente, getDadosCliente, getStatusContrato, getQtdeContratos, atualizarCliente, getClientePorCNPJ};