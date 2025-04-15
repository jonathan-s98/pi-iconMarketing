const { sql, config } = require('../config/db');

//Função para cadastrar um novo nível de acesso no banco de dados
async function cadastrarNivel(nome) {
    const pool = await sql.connect(config);
    const resultado = await pool.request()
        .input('nome', sql.VarChar, nome)
        .query(`INSERT INTO nivelAcesso (nome) VALUES (@nome)`);
    return resultado.rowsAffected[0] > 0;

}

//Função para pesquisar níveis de acesso no banco de dados
async function pesquisarNiveldeAcesso() {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request().query('SELECT * FROM niveldeAcesso');
    return resultado.recordset;
}

module.exports = {cadastrarNivel, pesquisarNiveldeAcesso};