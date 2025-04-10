const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.getDadosUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;