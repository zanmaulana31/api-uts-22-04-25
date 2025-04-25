const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StockService {
  async findAll() {
    return await prisma.stock.findMany({
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return await prisma.stock.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: true
      }
    });
  }

  async create(data) {
    const { productId, quantity, type } = data;
    
    if (!['in', 'out'].includes(type)) {
      throw new Error('Type must be either "in" or "out"');
    }

    return await prisma.stock.create({
      data: {
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        type
      },
      include: {
        product: true
      }
    });
  }

  async findByProduct(productId) {
    return await prisma.stock.findMany({
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
  }

  async getStockSummary() {
    const stocks = await prisma.stock.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      }
    });

    return await Promise.all(
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
  }
}

module.exports = new StockService();