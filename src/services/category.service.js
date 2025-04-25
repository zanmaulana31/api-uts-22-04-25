const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryService {
  async findAll() {
    return await prisma.category.findMany({
      include: {
        products: true
      }
    });
  }

  async findById(id) {
    return await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true
      }
    });
  }

  async create(data) {
    return await prisma.category.create({
      data
    });
  }

  async update(id, data) {
    return await prisma.category.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async delete(id) {
    return await prisma.category.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = new CategoryService();