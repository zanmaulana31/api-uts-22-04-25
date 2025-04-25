const supplierService = require('../services/supplier.service');

const getAllSuppliers = async (req, reply) => {
  try {
    const suppliers = await supplierService.findAll();
    return reply.send(suppliers);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getSupplierById = async (req, reply) => {
  try {
    const { id } = req.params;
    const supplier = await supplierService.findById(id);
    if (!supplier) {
      return reply.code(404).send({ error: 'Supplier not found' });
    }
    return reply.send(supplier);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const createSupplier = async (req, reply) => {
  try {
    const supplier = await supplierService.create(req.body);
    return reply.code(201).send(supplier);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const updateSupplier = async (req, reply) => {
  try {
    const { id } = req.params;
    const supplier = await supplierService.update(id, req.body);
    return reply.send(supplier);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const deleteSupplier = async (req, reply) => {
  try {
    const { id } = req.params;
    await supplierService.delete(id);
    return reply.code(204).send();
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};
