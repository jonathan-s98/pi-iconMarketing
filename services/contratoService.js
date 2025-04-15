const { sql, config } = require('../config/db');

//Função para cadastrar um novo contrato no banco de dados
async function cadastrarContrato(nome_arquivo,caminho_arquivo,data_envio,status_contrato,data_inicio,data_termino,id_cliente) {
    const pool = await sql.connect(config);
    const resultado = await pool.request()
        .input('nome_arquivo', sql.VarChar, nome_arquivo)
        .input('caminho_arquivo', sql.VarChar, caminho_arquivo)
        .input('data_envio', sql.Date, data_envio)
        .input('status_contrato', sql.VarChar, status_contrato)
        .input('data_inicio', sql.Date, data_inicio)
        .input('data_termino', sql.Date, data_termino)
        .input('id_cliente', sql.Int, id_cliente)
        .query(`INSERT INTO Contrato (nome_arquivo, caminho_arquivo, data_envio, status_contrato, data_inicio, data_termino, id_cliente) VALUES (@nome_arquivo, @caminho_arquivo, @data_envio, @status_contrato, @data_inicio, @data_termino, @id_cliente)`);
    return resultado.rowsAffected[0] > 0;
}

//Função para pesquisar contratos no banco de dados
async function pesquisarContrato() {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request().query('SELECT * FROM Contrato');
    return resultado.recordset;
}

//Função para pesquisar contratos que vencem nos próximos 15 dias
async function pesquisarContratosExpirando(data_termino) {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .input('data_termino', sql.Date, data_termino)
        .query('SELECT c.nome_fantasia, ct.nome_arquivo, ct.data_inicio, ct.data_termino FROM Contrato ct INNER JOIN Cliente c ON c.id = ct.id_cliente WHERE ct.data_termino BETWEEN GETDATE() AND DATEADD(DAY, 15, GETDATE()) ORDER BY data_termino ASC;')
    return resultado.recordset;
}

//Função para atualizar um contrato no banco de dados
async function atualizarContrato(id, nome_arquivo, caminho_arquivo, data_envio, status_contrato, data_inicio, data_termino) {
    try {
        const requisicaoAcessoDB = await sql.connect(config);
        const resultado = await requisicaoAcessoDB.request()
            .input('id', sql.Int, id)
            .input('nome_arquivo', sql.VarChar, nome_arquivo)
            .input('caminho_arquivo', sql.VarChar, caminho_arquivo)
            .input('data_envio', sql.DateTime, data_envio)
            .input('status_contrato', sql.VarChar, status_contrato)
            .input('data_inicio', sql.Date, data_inicio)
            .input('data_termino', sql.Date, data_termino)
            .query('UPDATE Contrato SET nome_arquivo = @nome_arquivo, caminho_arquivo = @caminho_arquivo, data_envio = @data_envio, status_contrato = @status_contrato, data_inicio = @data_inicio, data_termino = @data_termino WHERE id = @id');

        return resultado.rowsAffected[0];
    } catch (erro) {
        throw erro;
    }
}

module.exports = {cadastrarContrato, pesquisarContrato, pesquisarContratosExpirando, atualizarContrato};