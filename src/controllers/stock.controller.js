const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllStocks = async (req, reply) => {
  try {
    const stocks = await prisma.stock.findMany({
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return reply.send(stocks);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getStockById = async (req, reply) => {
  try {
    const { id } = req.params;
    const stock = await prisma.stock.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: true
      }
    });
    if (!stock) {
      return reply.code(404).send({ error: 'Stock not found' });
    }
    return reply.send(stock);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const createStock = async (req, reply) => {
  try {
    const { productId, quantity, type } = req.body;
    
    if (!['in', 'out'].includes(type)) {
      return reply.code(400).send({ error: 'Type must be either "in" or "out"' });
    }

    const stock = await prisma.stock.create({
      data: {
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        type
      },
      include: {
        product: true
      }
    });
    
    return reply.code(201).send(stock);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getStocksByProduct = async (req, reply) => {
  try {
    const { productId } = req.params;
    const stocks = await prisma.stock.findMany({
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
    return reply.send(stocks);
  } catch (error) {
    return reply.code(500).send({ error: error.message });
  }
};

const getStockSummary = async (req, reply) => {
  try {
    const stocks = await prisma.stock.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      }
    });

    const summaryWithDetails = await Promise.all(
      stocks.map(async (stock) => {
        const product = await prisma.product.findUnique({
          where: { id: stock.productId }
        });
        return {
          product,
          totalQuantity: stock._sum.quantity
        };
      })
    );

    res.json(summaryWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  getStocksByProduct,
  getStockSummary
};