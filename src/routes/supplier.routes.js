const supplierController = require('../controllers/supplier.controller');

async function supplierRoutes(fastify, options) {
  fastify.get('/', supplierController.getAllSuppliers);
  fastify.get('/:id', supplierController.getSupplierById);
  fastify.post('/', supplierController.createSupplier);
  fastify.put('/:id', supplierController.updateSupplier);
  fastify.delete('/:id', supplierController.deleteSupplier);
}

module.exports = supplierRoutes;
