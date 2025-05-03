import { FastifyReply, FastifyRequest } from 'fastify';
import { createOrder, findOrders } from './order.service.js';
import { CreateOrderInput } from './order.schema.js';

export const createOrderHandler = async (
  request: FastifyRequest<{
    Body: CreateOrderInput;
  }>,
  reply: FastifyReply,
) => {
  const { email } = request.user;
  const body = request.body;

  try {
    const order = await createOrder(body, email);
    return reply.code(201).send(order);
  } catch (err) {
    return reply.code(500).send(err);
  }
};

export const getOrdersHandler = async (request: FastifyRequest) => {
  // const { email } = request.user;
  const orders = await findOrders();
  return orders;
};
