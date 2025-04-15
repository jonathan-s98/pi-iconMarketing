const usuarioService = require('../services/usuarioService');

async function cadastrarNovoUsuario(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos' });
    }

    try {
        const sucesso = await usuarioService.cadastrarUsuario(nome, email, senha);

        if (sucesso) {
            res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
        } else {
            res.status(500).json({ mensagem: 'Não foi possível cadastrar o usuário' });
        }
    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

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
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function getUsuarioPorNivel(req, resposta) {
    const { id_nivel } = req.body;
    try{
        const usuario = await usuarioService.pesquisarUsuarioPorNivel(id_nivel);

        if (!usuario) {
            return resposta.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
        resposta.json(usuario);
        
    } catch (erro) {
        console.error('Erro ao obter usuário: ', erro);
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

async function atualizarUsuario(req, resposta) {
    const { id, nome, email, senha } = req.body;
    try {
        const atualizar = await usuarioService.atualizarUsuario(id, nome, email, senha);

        if (atualizar) {
            resposta.json({ mensagem: 'Contrato atualizado com sucesso' });
        } else {
            return resposta.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

    } catch (erro) {
        console.error('Erro ao atualizar usuário: ', erro);
        resposta.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
 
module.exports = {cadastrarNovoUsuario, getDadosUsuario, loginUsuario, getUsuarioPorNivel, atualizarUsuario};