import { Stream } from 'node:stream';
import Fastify, { FastifyInstance } from 'fastify';
import { RedisClientType } from 'redis';
import { Transporter } from 'nodemailer';
// import fcors from '@fastify/cors';
import fcookie from '@fastify/cookie';
import { prisma } from '@/utils/prisma.js';
import { fjwt, fmailer } from './plugins/index.js';
import { userRouter } from './modules/user/user.router.js';
import { orderRouter } from './modules/order/order.router.js';
import { dadataRouter } from './modules/dadata/dadata.router.js';
import { env } from './config/env.js';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
    mailer: Transporter;
    redis: RedisClientType;
    hasSession: any;
  }
}

function isTTY(stream: Stream | undefined): boolean {
  return stream !== undefined && (stream as any).isTTY === true;
}

const server: FastifyInstance = Fastify({
  logger: {
    transport: isTTY(process.stdout)
      ? {
          target: 'pino-pretty',
        }
      : undefined, // Use default NDJSON logger
  },
});

server.register(fcookie);
server.register(fjwt);
server.register(fmailer);
// server.register(fredis);

// server.register(fcors, {
//   origin: 'http://localhost:5173',
//   credentials: true,
// });

server.register(userRouter, { prefix: '/users' });
server.register(orderRouter, { prefix: '/orders' });
server.register(dadataRouter, { prefix: '/dadata' });

const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    server.log.info('Database connection successful (Prisma)');
    await prisma.$disconnect();
  } catch (error) {
    server.log.error('Error connecting to database:', error);
  }
};

const startServer = async () => {
  try {
    await server.listen({ port: env.PORT, host: env.HOST });
  } catch (error) {
    server.log.error('Error starting server:', error);
    process.exit(1);
  }
};

const shutdownServer = async () => {
  server.log.info('Shutting down server...');
  try {
    await server.close();
    server.log.info('Server stopped');
    await prisma.$disconnect();
    server.log.info('Database connection closed (Prisma)');
    process.exit(0);
  } catch (error) {
    server.log.error('Error during shutdown:', error);
    process.exit(1);
  }
};

const main = async () => {
  await checkDatabaseConnection();
  await startServer();

  process.on('SIGINT', shutdownServer);
  process.on('SIGTERM', shutdownServer);
};

main().catch((error) => {
  server.log.fatal('Unhandled error during startup:', error);
  process.exit(1);
});
