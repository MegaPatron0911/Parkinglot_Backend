// Rutas de API para la clase Vehiculo
const express = require('express');
const router = express.Router();
const { Vehiculo } = require('../model');

// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    res.json(vehiculos.map(v => v.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener vehículo por ID
router.get('/:id', async (req, res) => {
  try {
    const vehiculo = new Vehiculo();
    const encontrado = await vehiculo.findById(req.params.id);
    if (encontrado) {
      res.json(encontrado.toJSON());
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener vehículo por placa
router.get('/placa/:placa', async (req, res) => {
  try {
    const vehiculo = new Vehiculo();
    const encontrado = await vehiculo.findByPlaca(req.params.placa);
    if (encontrado) {
      res.json(encontrado.toJSON());
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener vehículos por usuario
router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findByUserId(req.params.usuario_id);
    res.json(vehiculos.map(v => v.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo vehículo
router.post('/', async (req, res) => {
  try {
    const datos = req.body;
    const vehiculo = new Vehiculo(
      null,
      datos.placa,
      datos.color,
      datos.modelo,
      datos.marca,
      datos.tipo,
      datos.usuario_id_usuario
    );
    await vehiculo.create();
    res.status(201).json(vehiculo.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar vehículo por ID
router.put('/:id', async (req, res) => {
  try {
    const vehiculo = new Vehiculo();
    const encontrado = await vehiculo.findById(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    Object.assign(encontrado, req.body);
    await encontrado.update();
    res.json(encontrado.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar vehículo por ID
router.delete('/:id', async (req, res) => {
  try {
    const vehiculo = new Vehiculo();
    const encontrado = await vehiculo.findById(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    await encontrado.delete();
    res.json({ mensaje: 'Vehículo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
