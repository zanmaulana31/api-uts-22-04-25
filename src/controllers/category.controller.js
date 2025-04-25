const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCategories = async (req, reply) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true
      }
    });
    return reply.send(categories);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getCategoryById = async (req, reply) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true
      }
    });
    if (!category) {
      return reply.code(404).send({ error: 'Category not found' });
    }
    return reply.send(category);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const createCategory = async (req, reply) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name }
    });
    return reply.code(201).send(category);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const updateCategory = async (req, reply) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    return reply.send(category);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const deleteCategory = async (req, reply) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: parseInt(id) }
    });
    return reply.code(204).send();
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};