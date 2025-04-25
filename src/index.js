require('dotenv').config();
const Fastify = require('fastify');
const productRoutes = require('./routes/product.routes');

const server = Fastify({ logger: true });

// Register routes
server.register(productRoutes, { prefix: '/products' });

// Start server
const start = async () => {
  try {
    await server.listen({ port: process.env.PORT });
    console.log(`🚀 Fastify server running at http://localhost:${process.env.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
