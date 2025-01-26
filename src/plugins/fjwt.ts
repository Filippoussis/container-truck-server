import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fjwt from '@fastify/jwt';
import { env } from '@/config/env.js';

const fastifyJwt = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(fjwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'sessionToken',
      signed: false,
    },
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    },
  );
};

export default fp(fastifyJwt);
