import Fastify, { FastifyInstance } from 'fastify';
// import { RedisClientType } from 'redis';
import { Transporter } from 'nodemailer';
import fcors from '@fastify/cors';
import fcookie from '@fastify/cookie';
import { fjwt, fmailer } from './plugins/index.js';
import { userRouter } from './modules/user/user.router.js';
import { orderRouter } from './modules/order/order.router.js';
import { dadataRouter } from './modules/dadata/dadata.router.js';
import { env } from './config/env.js';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
    mailer: Transporter;
    // redis: RedisClientType;
    hasSession: any;
  }
}

const server: FastifyInstance = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

server.register(fcookie);
server.register(fjwt);
server.register(fmailer);
// server.register(fredis);

server.register(fcors, {
  origin: 'http://localhost:5173',
  credentials: true,
});

server.register(userRouter, { prefix: '/api/users' });
server.register(orderRouter, { prefix: '/api/orders' });
server.register(dadataRouter, { prefix: '/api/dadata' });

const start = async () => {
  try {
    await server.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
