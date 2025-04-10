const clienteService = require ('../services/clienteService');

/*Após executar a query SQL por meio do script clienteService.js, os dados serão retornados, isto é, os dados dos clientes que estejam cadastrados no banco de dados.
Assim, para que seja possível visualizá-los, serão retornados no formato json*/

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
        resposta.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

async function getQtdeContratos(req, resposta) {
    try{
        const qtde = await clienteService.quantidadeContratos();
        resposta.json(qtde);

    } catch (erro) {
        console.error('Erro ao obter quantidade de contratos:', erro);
        resposta.status(500).json({ mensagem: 'Erro no servidor' });
    }
}

module.exports = {getDadosCliente, getStatusContrato, getQtdeContratos};