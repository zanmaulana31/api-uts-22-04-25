const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SupplierService {
  async findAll() {
    return await prisma.supplier.findMany({
      include: {
        products: true
      }
    });
  }

  async findById(id) {
    return await prisma.supplier.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true
      }
    });
  }

  async create(data) {
    return await prisma.supplier.create({ data });
  }

  async update(id, data) {
    return await prisma.supplier.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async delete(id) {
    return await prisma.supplier.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = new SupplierService();
