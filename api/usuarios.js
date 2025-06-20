// Handler serverless para Vercel: expone los endpoints de usuario
const express = require('express');
const usuarioRoutes = require('../routes/usuario.routes');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();
app.use(bodyParser.json());
app.use('/api/usuarios', usuarioRoutes);

// Para la raíz de la API
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Usuarios funcionando correctamente (Vercel)' });
});

module.exports = serverless(app);
