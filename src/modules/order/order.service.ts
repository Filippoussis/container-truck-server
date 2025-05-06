import { prisma } from '../../utils/prisma.js';
import { CreateOrderInput } from './order.schema.js';

export const createOrder = async (input: CreateOrderInput, email: string) => {
  const { dateOfTransportation, ...restData } = input;
  const order = await prisma.order.create({
    data: {
      dateOfTransportation: new Date(dateOfTransportation),
      ...restData,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  return order;
};

export const findOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
  });

  return orders;
};

export const findOrdersByEmail = async (email: string) => {
  const orders = await prisma.order.findMany({
    where: {
      user: {
        email,
      },
    },
  });

  return orders;
};
