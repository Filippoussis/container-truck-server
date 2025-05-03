import { FastifyInstance } from 'fastify';
import { fetchDadataHandler } from './dadata.controller.js';
import { dadataJsonSchema } from './dadata.schema.js';

export const dadataRouter = async (server: FastifyInstance) => {
  server.post(
    '/address',
    {
      schema: {
        body: dadataJsonSchema,
      },
      preValidation: [server.authenticate],
    },
    fetchDadataHandler,
  );
};
