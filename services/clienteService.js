const { sql, config } = require('../config/db');

//Função para cadastrar um novo cliente no banco de dados
async function cadastrarCliente(nome_fantasia, razao_social, cnpj, segmento, telefone, site, id_usuario) {
    const pool = await sql.connect(config);
    const resultado = await pool.request()
        .input('nome_fantasia', sql.VarChar, nome_fantasia)
        .input('razao_social', sql.VarChar, razao_social)
        .input('cnpj', sql.VarChar, cnpj)
        .input('segmento', sql.VarChar, segmento)
        .input('telefone', sql.VarChar, telefone)
        .input('site', sql.VarChar, site)
        .input('id_usuario', sql.Int, id_usuario)
        .query(`INSERT INTO Cliente (nome_fantasia, razao_social, cnpj, segmento, telefone, site, id_usuario) VALUES (@nome_fantasia, @razao_social, @cnpj, @segmento, @telefone, @site, @id_usuario)`);
    return resultado.rowsAffected[0] > 0;
}

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

//Função para atualizar um cliente no banco de dados
async function atualizarCliente(id, nome_fantasia, razao_social, cnpj, segmento, telefone, site) {
    try {
        const requisicaoAcessoDB = await sql.connect(config);
        const resultado = await requisicaoAcessoDB.request()
            .input('id', sql.Int, id)
            .input('nome_fantasia', sql.VarChar, nome_fantasia)
            .input('razao_social', sql.VarChar, razao_social)
            .input('cnpj', sql.VarChar, cnpj)
            .input('segmento', sql.VarChar , segmento)
            .input('telefone', sql.VarChar , telefone)
            .input('site', sql.VarChar , site)
            .query('UPDATE Cliente SET nome_fantasia = @nome_fantasia, razao_social = @razao_social, cnpj = @cnpj, segmento = @segmento, telefone = @telefone, site = @site WHERE id = @id');

        return resultado.rowsAffected[0];
    } catch (erro) {
        throw erro;
    }
}

async function pesquisarClientePorCNPJ(CNPJ) {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .input('CNPJ', sql.VarChar, CNPJ)
        .query(`SELECT * FROM Cliente WHERE CNPJ = @CNPJ`);
        
    return resultado.recordset[0];
}

module.exports = {cadastrarCliente, pesquisarCliente, statusContrato, qtdeContratos, atualizarCliente, pesquisarClientePorCNPJ};