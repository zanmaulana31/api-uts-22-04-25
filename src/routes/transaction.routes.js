const transactionController = require('../controllers/transaction.controller');

async function transactionRoutes(fastify, options) {
  fastify.get('/', transactionController.getAllTransactions);
  fastify.get('/summary', transactionController.getTransactionSummary);
  fastify.get('/:id', transactionController.getTransactionById);
  fastify.get('/product/:productId', transactionController.getTransactionsByProduct);
  fastify.post('/', transactionController.createTransaction);
}

module.exports = transactionRoutes;