const { sql, config } = require('../config/db');

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

module.exports = {pesquisarContrato, pesquisarContratosExpirando};