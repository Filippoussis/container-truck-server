import { createError } from '@fastify/error';

export const SessionNotFoundError = createError(
  'FST_SESSION_NOT_FOUND',
  'No session was found in cache',
  401,
);
