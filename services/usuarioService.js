const { sql, config } = require('../config/db');

// Função para cadastrar um novo usuário no banco de dados
async function cadastrarUsuario(nome, email, senha, id_nivel) {
    const pool = await sql.connect(config);
    const resultado = await pool.request()
        .input('nome', sql.VarChar, nome)
        .input('email', sql.VarChar, email)
        .input('senha', sql.VarChar, senha)
        .input('id_nivel', sql.Int, id_nivel)
        .query(`INSERT INTO Usuario (nome, email, senha, id_nivel) VALUES (@nome, @email, @senha, @id_nivel)`);
    return resultado.rowsAffected[0] > 0;
}

// Função para pesquisar um usuário no banco de dados
async function pesquisarUsuario() {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .query('SELECT * FROM Usuario');
    return resultado.recordset;
}

// Função para logar um usuário no banco de dados
async function autenticarUsuario(email, senha) {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .input('email', sql.VarChar, email)
        .input('senha', sql.VarChar, senha)
        .query('SELECT * FROM Usuario WHERE email = @email AND senha = @senha');
 
    return resultado.recordset[0]; // retorna o primeiro usuário encontrado ou undefined
}

// Função para pesquisar um usuário por nível de acesso
async function pesquisarUsuarioPorNivel(id_nivel) {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request()
        .input('id_nivel', sql.VarChar, id_nivel)
        .query('SELECT * FROM Cliente WHERE id_nivel = @id_nivel');

    return resultado.recordset[0];
}

// Função para atualizar um usuário no banco de dados
async function atualizarUsuario(id, nome, email, senha) {
    try {
        const requisicaoAcessoDB = await sql.connect(config);
        const resultado = await requisicaoAcessoDB.request()
            .input('id', sql.Int, id)
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('senha', sql.VarChar, senha)
            .query('UPDATE Usuario SET nome = @nome, email = @email, senha = @senha WHERE id = @id');
            
        return resultado.rowsAffected[0];
    } catch (erro) {
        throw erro;
    }
}
 
module.exports = {cadastrarUsuario, pesquisarUsuario, autenticarUsuario, pesquisarUsuarioPorNivel, atualizarUsuario};