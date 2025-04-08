const clienteService = require ('../services/clienteService');

//Após executar a query SQL por meio do script clienteService.js, os dados serão retornados, isto é, os dados dos clientes que estejam cadastrados no banco de dados. Assim, para que seja possível visualizá-los, serão retornados no formato json

async function getDadosCliente(req, resposta) {
    const clientes = await clienteService.pesquisarCliente();
    resposta.json(clientes);
};


module.exports = {getDadosCliente};