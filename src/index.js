require('dotenv').config();
const Fastify = require('fastify');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const stockRoutes = require('./routes/stock.routes');
const transactionRoutes = require('./routes/transaction.routes');
const supplierRoutes = require('./routes/supplier.routes');

const server = Fastify({ logger: true });

// Register routes
server.register(productRoutes, { prefix: '/products' });
server.register(categoryRoutes, { prefix: '/categories' });
server.register(stockRoutes, { prefix: '/stocks' });
server.register(transactionRoutes, { prefix: '/transactions' });
server.register(supplierRoutes, { prefix: '/suppliers' });

// Start server
const start = async () => {
  try {
    await server.listen({ port: process.env.PORT, host: '127.0.0.1' });
    console.log(`🚀 Fastify server running at http://localhost:${process.env.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
