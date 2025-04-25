const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = (data) => prisma.product.create({ data });

exports.getAll = () =>
  prisma.product.findMany({ include: { category: true, user: true } });

exports.update = (id, data) =>
  prisma.product.update({ where: { id: parseInt(id) }, data });

exports.remove = (id) =>
  prisma.product.delete({ where: { id: parseInt(id) } });
