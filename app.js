const { Usuario } = require('./model');
const supabase = require('./DatabaseConnection');

// Iniciar el servidor Express
const express = require('express');
const usuarioRoutes = require('./routes/usuario.routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/usuarios', usuarioRoutes);

// Respuesta JSON en la raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Usuarios funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

