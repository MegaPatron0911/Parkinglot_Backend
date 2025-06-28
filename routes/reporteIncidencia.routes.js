const express = require('express');
const router = express.Router();
const ReporteIncidencia = require('../model/ReporteIncidencia');

// Crear un nuevo reporte de incidencia
router.post('/', async (req, res) => {
  try {
    const { vehiculo_id, incidencia_id, fecha_hora } = req.body;
    const reporte = new ReporteIncidencia(vehiculo_id, incidencia_id, fecha_hora);
    await reporte.create();
    res.status(201).json(reporte.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los reportes de incidencia
router.get('/', async (req, res) => {
  try {
    const reportes = await ReporteIncidencia.findAll();
    res.json(reportes.map(r => r.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reportes por IDs de vehículo e incidencia
router.get('/by-ids', async (req, res) => {
  try {
    const { vehiculo_id, incidencia_id } = req.query;
    const reporte = new ReporteIncidencia();
    const resultados = await reporte.findByIds(vehiculo_id, incidencia_id);
    res.json(resultados.map(r => r.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reportes por ID de vehículo
router.get('/vehiculo/:vehiculo_id', async (req, res) => {
  try {
    const { vehiculo_id } = req.params;
    const reportes = await ReporteIncidencia.findByVehicleId(vehiculo_id);
    res.json(reportes.map(r => r.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reportes por ID de incidencia
router.get('/incidencia/:incidencia_id', async (req, res) => {
  try {
    const { incidencia_id } = req.params;
    const reportes = await ReporteIncidencia.findByIncidentId(incidencia_id);
    res.json(reportes.map(r => r.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reportes por rango de fechas
router.get('/rango-fechas', async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const reportes = await ReporteIncidencia.findByDateRange(fechaInicio, fechaFin);
    res.json(reportes.map(r => r.toJSON()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un reporte de incidencia
router.put('/', async (req, res) => {
  try {
    const { vehiculo_id, incidencia_id, fecha_hora } = req.body;
    const reporte = new ReporteIncidencia(vehiculo_id, incidencia_id, fecha_hora);
    await reporte.update();
    res.json(reporte.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un reporte de incidencia por IDs
router.delete('/', async (req, res) => {
  try {
    const { vehiculo_id, incidencia_id } = req.body;
    const reporte = new ReporteIncidencia(vehiculo_id, incidencia_id);
    await reporte.delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar todos los reportes de un vehículo
router.delete('/vehiculo/:vehiculo_id', async (req, res) => {
  try {
    const { vehiculo_id } = req.params;
    await ReporteIncidencia.deleteByVehicleId(vehiculo_id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
