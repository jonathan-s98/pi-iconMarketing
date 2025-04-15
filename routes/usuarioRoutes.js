const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/usuarios', usuarioController.cadastrarNovoUsuario);
router.get('/usuarios', usuarioController.getDadosUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/usuarios', usuarioController.getUsuarioPorNivel);
router.put('/usuarios:id', usuarioController.atualizarUsuario);

module.exports = router;