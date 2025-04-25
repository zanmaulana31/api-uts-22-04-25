const stockController = require('../controllers/stock.controller');

async function stockRoutes(fastify, options) {
  fastify.get('/', stockController.getAllStocks);
  fastify.get('/summary', stockController.getStockSummary);
  fastify.get('/:id', stockController.getStockById);
  fastify.get('/product/:productId', stockController.getStocksByProduct);
  fastify.post('/', stockController.createStock);
}

module.exports = stockRoutes;