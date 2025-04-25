const productService = require('../services/product.service');

exports.createProduct = async (req, reply) => {
  const product = await productService.create(req.body);
  reply.send(product);
};

exports.getAllProducts = async (req, reply) => {
  const products = await productService.getAll();
  reply.send(products);
};

exports.updateProduct = async (req, reply) => {
  const { id } = req.params;
  const product = await productService.update(id, req.body);
  reply.send(product);
};

exports.deleteProduct = async (req, reply) => {
  const { id } = req.params;
  await productService.remove(id);
  reply.send({ message: 'Deleted' });
};
