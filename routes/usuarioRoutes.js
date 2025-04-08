const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.getDadosUsuario);

module.exports = router;