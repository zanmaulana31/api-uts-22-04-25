const categoryController = require('../controllers/category.controller');

async function categoryRoutes(fastify, options) {
  fastify.get('/', categoryController.getAllCategories);
  fastify.get('/:id', categoryController.getCategoryById);
  fastify.post('/', categoryController.createCategory);
  fastify.put('/:id', categoryController.updateCategory);
  fastify.delete('/:id', categoryController.deleteCategory);
}

module.exports = categoryRoutes;