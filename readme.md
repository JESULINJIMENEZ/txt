# Bowl API

API para la generación de archivos TXT y consulta de datos relacionados con homologaciones y puntos de venta.

## Rutas disponibles

### 1. `/generarTxt` (POST)
Genera un archivo `output.txt` con información de facturas y productos homologados.

**Body de ejemplo:**
```json
{
  "facturas": 2,
  "pdv": "1234",
  "origen": "10001",
  "productos": [
    { "item_id": "A001", "cantidad": 3 }
  ]
}
```
**Respuesta:** Descarga el archivo `output.txt` generado.

**Errores comunes:**
- 400: Datos inválidos
- 404: No se encontró información para el pdv u origen, o item no encontrado

---

### 2. `/homologations` (GET)
Devuelve todos los registros de homologación en formato JSON.

**Respuesta de ejemplo:**
```json
[
  { "hom_id": 1, "sap_code": "S001", "descripion": "Bowl grande", "micros_code": "M001" },
  { "hom_id": 2, "sap_code": "S002", "descripion": "Bowl pequeño", "micros_code": "M002" }
]
```

---

### 3. `/bowl-homologations` (GET)
Devuelve solo los registros de homologación cuya descripción contiene "Bowl".

**Respuesta de ejemplo:**
```json
[
  { "hom_id": 1, "sap_code": "S001", "descripion": "Bowl grande", "micros_code": "M001" }
]
```

---

### 4. `/db` (GET)
Devuelve el contenido completo del archivo `db.json`.

**Respuesta de ejemplo:**
```json
[
  { "pdv": "1234", "origen": "10001", "codigo1": "C1", "codigo2": "C2", "fecha": "2025-07-01", "descripcion": "Sucursal Centro", "pago": "Efectivo" }
]
```

---

### 5. `/listshops` (GET)
Devuelve la lista de tiendas desde el archivo `pdv.json`.

**Respuesta de ejemplo:**
```json
[
  { "shop_id": "001", "nombre": "Sucursal Centro" },
  { "shop_id": "002", "nombre": "Sucursal Norte" }
]
```

---

## Uso

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor:
   ```bash
   node src/index.js
   ```
3. Realiza peticiones a las rutas usando Postman, curl o cualquier cliente HTTP.

---

## Notas
- Asegúrate de tener los archivos `db.json` y `pdv.json` en la raíz del proyecto.
- El archivo generado por `/generarTxt` se descarga directamente.
- Para pruebas, puedes modificar los datos de ejemplo según tu necesidad.
