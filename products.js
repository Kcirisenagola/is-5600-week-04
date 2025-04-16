const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'data/full-products.json');

/**
 * Retrieve a list of products with pagination
 * @param {object} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25 } = options;
  const data = await fs.readFile(productsFile);
  return JSON.parse(data).slice(offset, offset + limit); // Slice the products for pagination
}

/**
 * Get a product by its ID
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));
  return products.find(product => product.id === id) || null; // Return the product if found, else null
}

module.exports = {
  list,
  get
};
