import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchDadata } from './dadata.service.js';
import { DadataInput } from './dadata.schema.js';

export const fetchDadataHandler = async (
  request: FastifyRequest<{
    Body: DadataInput;
  }>,
  reply: FastifyReply,
) => {
  const { query } = request.body;

  try {
    const data = await fetchDadata(query);
    return reply.code(200).send(data);
  } catch (err) {
    return reply.code(500).send(err);
  }
};
