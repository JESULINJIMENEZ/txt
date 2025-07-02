const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Homologation = require('../models/homologation');
const dbData = require('../../db.json');

router.post('/generarTxt', async (req, res) => {
    try {
        const { pdv, origen, productos } = req.body;
        console.log('POST /generarTxt body:', req.body);

        if (!pdv || !origen || !Array.isArray(productos) || productos.length === 0) {
            console.log('Datos inválidos:', { pdv, origen, productos });
            return res.status(400).json({ message: 'Datos inválidos' });
        }

        // Buscar datos del pdv en db.json
        const pdvData = dbData.find(item => item.pdv === pdv && item.origen == origen);
        if (!pdvData) {
            return res.status(404).json({ message: `No se encontró información para el pdv: ${pdv} y origen: ${origen}` });
        }

        let lines = [];
        // Por cada producto, genera un bloque CAB + POS
        for (const prod of productos) {
            // CABECERA
            lines.push(
                `CAB|NOING-${pdv}-JUNIO1|${pdvData.origen}|${pdvData.codigo1}|${pdvData.codigo2}|${pdvData.fecha}||${pdvData.descripcion}|${pdvData.pago}||${pdvData.campo2 || ''}||0|`
            );
            // Línea POS extra si aplica
            if (pdvData.origen != 1000288) {
                lines.push('POS|18|1|EA|0|311|100||000000|||');
            }
            // Línea POS del producto
            const item = await Homologation.findOne({
                where: { hom_id: prod.item_id }
            });
            if (!item) {
                console.log('Item no encontrado:', prod.item_id);
                return res.status(404).json({ message: `Item no encontrado: ${prod.item_id}` });
            }
            lines.push(
                `POS|${item.sap_code}|${prod.cantidad}|EA|0|Z04|100||000000|||`
            );
        }

        const filePath = path.join(__dirname, '../..', 'output.txt');
        console.log('Escribiendo archivo en:', filePath);
        fs.writeFileSync(filePath, lines.join('\n'));
        res.download(filePath, 'output.txt', (err) => {
            if (err) {
                console.error('Error al descargar el archivo:', err);
                res.status(500).send('Error al descargar el archivo');
            }
            console.log('Descarga completada, archivo NO eliminado');
        });
    } catch (error) {
        console.error('Error al generar el archivo TXT:', error);
        return res.status(500).json({ message: 'Error interno en el servidor' });
    }
});

module.exports = router;
