import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { env } from '../config/env.js';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { id: string; email: string };
  }
}

const fjwt = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(fastifyJwt, {
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

export default fp(fjwt);
