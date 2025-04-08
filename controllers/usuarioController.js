const usuarioService = require('../services/usuarioService');

async function getDadosUsuario(req, resposta) {
    const usuarios = await usuarioService.pesquisarUsuario();
    resposta.json(usuarios);
};

module.exports = {getDadosUsuario};