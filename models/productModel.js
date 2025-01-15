const db = require('../database'); //archivo database.js 

const findProductById = (id) => db.products.find((product) => product.id === id);
const addProduct = (product) => db.products.push(product);
const updateStock = (id, stock) => {
  const product = findProductById(id);
  if (product) {
    product.stock = stock;
    return product;
  }
  return null;
};

module.exports = { findProductById, addProduct, updateStock };
