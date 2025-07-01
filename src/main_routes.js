// Archivo principal de rutas: importa y usa los routers separados
const express = require('express');
const router = express.Router();

// Importar routers separados
const homologationRoutes = require('./routes/homologation.routes');
const jsonRoutes = require('./routes/json.routes');
const txtRoutes = require('./routes/txt.routes');

// Usar los routers
router.use(homologationRoutes);
router.use(jsonRoutes);
router.use(txtRoutes);

module.exports = router;
