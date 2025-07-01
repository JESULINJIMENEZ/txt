const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// funcion para leer el archivo db.json y devolver su contenido
const readDbJson = () => {
    const dbPath = path.join(__dirname, '../..', 'db.json');
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData);
}

// Ruta para obtener registros de db.json (JSON)
router.get('/db', (req, res) => {
    try {
        const data = readDbJson();
        res.json(data);
    } catch (error) {
        console.error('Error al leer db.json:', error);
        return res.status(500).json({ message: 'Error al leer db.json' });
    }
});

//funcion para leer el archivo pdv.json y devolver su contenido
const readPdvJson = () => {
    const pdvPath = path.join(__dirname, '../..', 'pdv.json');
    const rawData = fs.readFileSync(pdvPath);
    return JSON.parse(rawData);
}

router.get('/listshops', async (req, res) => {
    try {
        const shops = readPdvJson();
        res.json(shops);
    } catch (error) {
        console.error('Error al obtener lista de tiendas:', error);
        return res.status(500).json({ message: 'Error al obtener lista de tiendas' });
    }
});

module.exports = router;
