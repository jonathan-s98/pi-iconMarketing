const { sql, config } = require('../config/db');

async function pesquisarUsuario() {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .query('SELECT * FROM Usuario');
    return resultado.recordset;
}

async function autenticarUsuario(email, senha) {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .input('email', sql.VarChar, email)
        .input('senha', sql.VarChar, senha)
        .query('SELECT * FROM Usuario WHERE email = @email AND senha = @senha');
 
    return resultado.recordset[0]; // retorna o primeiro usuário encontrado ou undefined
}
 
module.exports = { pesquisarUsuario, autenticarUsuario };