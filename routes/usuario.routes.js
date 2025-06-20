// Rutas de API para la clase Usuario
const express = require('express');
const router = express.Router();
const { Usuario } = require('../model');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios.map(u => u.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = new Usuario();
    const encontrado = await usuario.findById(req.params.id);
    if (encontrado) {
      res.json(encontrado.toJSON());
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario por número de documento
router.get('/documento/:numero', async (req, res) => {
  try {
    const usuario = new Usuario();
    const encontrado = await usuario.findByDocument(req.params.numero);
    if (encontrado) {
      res.json(encontrado.toJSON());
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const datos = req.body;
    const usuario = new Usuario(
      null,
      datos.tipo_documento,
      datos.numero_documento,
      datos.primer_nombre,
      datos.segundo_nombre,
      datos.primer_apellido,
      datos.segundo_apellido,
      datos.direccion_correo,
      datos.numero_celular,
      datos.foto_perfil,
      datos.estado,
      datos.clave,
      datos.perfil_usuario_id
    );
    await usuario.create();
    res.status(201).json(usuario.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar usuario por ID
router.put('/:id', async (req, res) => {
  try {
    const usuario = new Usuario();
    const encontrado = await usuario.findById(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    Object.assign(encontrado, req.body);
    await encontrado.update();
    res.json(encontrado.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    const usuario = new Usuario();
    const encontrado = await usuario.findById(req.params.id);
    if (!encontrado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await encontrado.delete();
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
