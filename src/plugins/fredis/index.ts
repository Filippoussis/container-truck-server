import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import { createClient, RedisClientType } from 'redis';
import { SessionNotFoundError } from '@/utils/errors.js';
import { close, hasSession } from './helpers.js';

const fastifyRedis = async (fastify: FastifyInstance): Promise<void> => {
  let client: RedisClientType;

  try {
    client = createClient();
    client
      .on('error', (err) => console.log('Redis Client Error', err))
      .connect();
  } catch (error) {
    throw error;
  }

  fastify.addHook('onClose', close);
  fastify.decorate('redis', client);
  fastify.decorate(
    'hasSession',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        let result = false;
        if (request.cookies) {
          if (request.cookies.sessionToken) {
            const sessionToken = request.cookies.sessionToken;
            const decodedToken = request.server.jwt.decode<{
              id: string;
            }>(sessionToken);
            if (decodedToken !== null) {
              result = await hasSession(request, decodedToken.id, sessionToken);
            }
          }
        }
        if (result) {
          return result;
        } else {
          throw new SessionNotFoundError();
        }
      } catch (e) {
        return reply.send(e);
      }
    },
  );
};

export default fp(fastifyRedis);
