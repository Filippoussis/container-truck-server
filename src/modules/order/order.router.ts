import { FastifyInstance } from 'fastify';
import { createOrderHandler, getOrdersHandler } from './order.controller.js';
import {
  createOrderJsonSchema,
  ordersResponseJsonSchema,
} from './order.schema.js';

export const orderRouter = async (server: FastifyInstance) => {
  server.post(
    '/create',
    {
      schema: {
        body: createOrderJsonSchema,
      },
      preValidation: [server.authenticate],
    },
    createOrderHandler,
  );
  server.get(
    '/getAll',
    {
      preValidation: [server.authenticate],
      schema: {
        response: {
          200: ordersResponseJsonSchema,
        },
      },
    },
    getOrdersHandler,
  );
};
