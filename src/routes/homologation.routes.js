const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Homologation = require('../models/homologation');

// Ruta para obtener todos los registros de homologation (JSON)
router.get('/homologations', async (req, res) => {
    try {
        const homologations = await Homologation.findAll({
            attributes: ["hom_id", "sap_code", "descripion", "micros_code"]
        });
        return res.json(homologations);
    } catch (error) {
        console.error('Error al obtener homologaciones:', error);
        return res.status(500).json({ message: "Error interno en el servidor, comuniquese con el administrador" });
    }
});

// Ruta para obtener registros que incluyan "Bowl" en la descripción (JSON)
router.get('/bowl-homologations', async (req, res) => {
    try {
        const homologations = await Homologation.findAll({
            where: {
                [Op.or]: [
                    { descripion: { [Op.like]: '%Bowl%' } },
                    { descripion: { [Op.like]: '%(2x1 RAPPI)%' } }
                ]
            },
            attributes: ["hom_id", "sap_code", "descripion", "micros_code"]
        });
        res.json(homologations);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener homologaciones de Bowl' });
    }
});

module.exports = router;
