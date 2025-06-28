// Servidor Express para exponer la API de Usuario
const express = require('express');
const usuarioRoutes = require('./routes/usuario.routes');
const reporteIncidenciaRoutes = require('./routes/reporteIncidencia.routes');
const vehiculoRoutes = require('./routes/vehiculo.routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rutas para usuario
app.use('/api/usuarios', usuarioRoutes);
// Rutas para reporte de incidencia
app.use('/api/reportes-incidencia', reporteIncidenciaRoutes);
// Rutas para vehiculo
app.use('/api/vehiculo', vehiculoRoutes);

app.get('/', (req, res) => {
  res.send('API de Usuarios funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
