const { sql, config } = require('../config/db');

async function pesquisarUsuario() {
    const requisicaoAcessoDB = await sql.connect(config);
    const resultado = await requisicaoAcessoDB.request().query('SELECT * FROM Usuario');
    return resultado.recordset;
}

module.exports = {pesquisarUsuario};