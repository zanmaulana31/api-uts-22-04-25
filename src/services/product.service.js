const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = (data) => prisma.product.create({ data });

exports.getAll = () =>
  exports.getAll = () =>
    prisma.product.findMany({
      include: {
        category: true,
        stock: true,
        transactions: true,
        supplier: true
      }
    });
    
exports.update = (id, data) =>
  prisma.product.update({ where: { id: parseInt(id) }, data });

exports.remove = (id) =>
  prisma.product.delete({ where: { id: parseInt(id) } });
