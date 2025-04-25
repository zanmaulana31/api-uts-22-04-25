const productController = require('../controllers/product.controller');

async function productRoutes(fastify, opts) {
  fastify.post('/', productController.createProduct);
  fastify.get('/', productController.getAllProducts);
  fastify.put('/:id', productController.updateProduct);
  fastify.delete('/:id', productController.deleteProduct);
}

module.exports = productRoutes;
