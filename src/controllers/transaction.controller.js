const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTransactions = async (req, reply) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return reply.send(transactions);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getTransactionById = async (req, reply) => {
  try {
    const { id } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: true
      }
    });
    if (!transaction) {
      return reply.code(404).send({ error: 'Transaction not found' });
    }
    return reply.send(transaction);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const createTransaction = async (req, reply) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) }
    });

    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }

    const total = product.price * quantity;

    const transaction = await prisma.transaction.create({
      data: {
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        total
      },
      include: {
        product: true
      }
    });

    // Create stock out record
    await prisma.stock.create({
      data: {
        productId: parseInt(productId),
        quantity: -parseInt(quantity),
        type: 'out'
      }
    });

    return reply.code(201).send(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionsByProduct = async (req, reply) => {
  try {
    const { productId } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        productId: parseInt(productId)
      },
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return reply.send(transactions);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getTransactionSummary = async (req, reply) => {
  try {
    const summary = await prisma.transaction.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        total: true
      },
      _count: {
        id: true
      }
    });

    const summaryWithDetails = await Promise.all(
      summary.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        });
        return {
          product,
          totalQuantity: item._sum.quantity,
          totalAmount: item._sum.total,
          totalTransactions: item._count.id
        };
      })
    );

    res.json(summaryWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  getTransactionsByProduct,
  getTransactionSummary
};