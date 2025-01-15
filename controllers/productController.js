const { findProductById, addProduct, updateStock } = require('../models/productModel');

// programación defensiva
const consultarProducto = (req, res) => {
  const id = parseInt(req.params.id_producto, 10);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de producto debe ser un entero positivo.' });
  }

  const product = findProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  res.json({ name: product.name, stock: product.stock });
};

const agregarProducto = (req, res) => {
  const { id, name, stock } = req.body;
  if (!Number.isInteger(id) || id <= 0 || typeof name !== 'string' || !Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ error: 'Datos inválidos. Verifique ID, nombre y stock.' });
  }

  addProduct({ id, name, stock });
  res.status(201).json({ message: 'Producto agregado exitosamente.' });
};

// programación por contrato
const actualizarStock = (req, res) => {
  const id = parseInt(req.params.id_producto, 10);
  const { nueva_cantidad } = req.body;

  // aserciones
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de producto debe ser un entero positivo.' });
  }
  if (!Number.isInteger(nueva_cantidad) || nueva_cantidad < 0) {
    return res.status(400).json({ error: 'La cantidad debe ser un entero no negativo.' });
  }

  const updatedProduct = updateStock(id, nueva_cantidad);
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  res.json({ message: 'Stock actualizado exitosamente.', product: updatedProduct });
};

module.exports = { consultarProducto, agregarProducto, actualizarStock };
