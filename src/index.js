const express = require('express');
const morgan = require('morgan'); // <-- Agrega esta línea
const { testConnection, syncDatabase } = require('../config/db');
const mainRoutes = require('./main_routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev')); // <-- Agrega esta línea para ver las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas principales
app.use('/', mainRoutes);

// Inicialización de la base de datos
testConnection();
syncDatabase();

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
