const express = require('express');

const clienteRoutes = require('./routes/clienteRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const contratoRoutes = require('./routes/contratoRoutes');

const app = express();

app.use('/iconmarketing', clienteRoutes);
app.use('/iconmarketing', usuarioRoutes);
app.use('/iconmarketing', contratoRoutes)

module.exports = app;