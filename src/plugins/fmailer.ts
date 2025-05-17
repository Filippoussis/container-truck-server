import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { createTransport } from 'nodemailer';
import { env } from '../config/env.js';

const fastifyMailer = async (fastify: FastifyInstance): Promise<void> => {
  const defaults = { from: env.MAIL_FROM };
  const transport = {
    host: env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    },
  };

  let transporter;

  try {
    transporter = createTransport(transport, defaults);
  } catch (error) {
    fastify.log.error(error);
    throw error;
  }

  fastify.decorate('mailer', transporter);
};

export default fp(fastifyMailer);
