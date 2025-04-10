const { sql, config } = require('../config/db');

//Função para pesquisar clientes no banco de dados
async function pesquisarCliente() {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request().query('SELECT * FROM Cliente');
    console.log(resultado.recordset);
    return resultado.recordset;  
}

//Função para listar os clientes e o status de seus contratos ordenando-os pela data de início mais recente 
async function statusContrato(status_contrato) {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .input('status_contrato', sql.VarChar, status_contrato)    
        .query('SELECT c.nome_fantasia, c.cnpj, ct.status_contrato, ct.data_inicio, ct.data_termino FROM Cliente c INNER JOIN Contrato ct ON ct.id_cliente = c.id ORDER BY data_inicio ASC WHERE status_contrato = @ct.status_contrato;')
    return resultado.recordset;
}

//Função para listar a quantidade de contratos que cada cliente possui
async function qtdeContratos() {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .query('SELECT c.nome_fantasia, COUNT(ct.id) AS total_contratos FROM Cliente c LEFT JOIN Contrato ct ON ct.id_cliente = c.id GROUP BY c.nome_fantasia ORDER BY total_contratos DESC;')
    return resultado.recordset;
}

module.exports = {pesquisarCliente, statusContrato, qtdeContratos};