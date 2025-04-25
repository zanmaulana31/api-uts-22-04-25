const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TransactionService {
  async findAll() {
    return await prisma.transaction.findMany({
      include: {
        product: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: true
      }
    });
  }

  async create(data) {
    const { productId, quantity } = data;
    
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const total = product.price * quantity;

    // Use transaction to ensure data consistency
    return await prisma.$transaction(async (prisma) => {
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

      return transaction;
    });
  }

  async findByProduct(productId) {
    return await prisma.transaction.findMany({
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

  async getTransactionSummary() {
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

    return await Promise.all(
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
  }
}

module.exports = new TransactionService();