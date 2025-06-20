// Servidor Express para exponer la API de Usuario
const express = require('express');
const usuarioRoutes = require('./routes/usuario.routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rutas para usuario
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API de Usuarios funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
