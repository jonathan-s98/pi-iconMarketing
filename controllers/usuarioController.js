const usuarioService = require('../services/usuarioService');

async function getDadosUsuario(req, resposta) {
    const usuarios = await usuarioService.pesquisarUsuario();
    resposta.json(usuarios);
}

async function loginUsuario(req, resposta) {
    const { email, senha } = req.body;
    try {
        const usuario = await usuarioService.autenticarUsuario(email, senha);
 
        if (!usuario) {
            return resposta.status(401).json({ mensagem: 'Credenciais inválidas' });
        }
        resposta.json({ mensagem: 'Login bem-sucedido', usuario });
 
    } catch (erro) {
        console.error('Erro ao tentar logar:', erro);
        resposta.status(500).json({ mensagem: 'Erro no servidor' });
    }
}
 
module.exports = {getDadosUsuario, loginUsuario};