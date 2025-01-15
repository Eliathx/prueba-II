const express = require('express');
const { consultarProducto, agregarProducto, actualizarStock } = require('../controllers/productController');

const router = express.Router();

router.get('/:id_producto', consultarProducto);
router.post('/', agregarProducto);
router.put('/:id_producto', actualizarStock);

module.exports = router;
