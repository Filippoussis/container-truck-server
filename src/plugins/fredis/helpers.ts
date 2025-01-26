import { FastifyInstance, FastifyRequest } from 'fastify';

export const close = (fastify: FastifyInstance) => {
  return fastify.redis.quit();
};

export const hasSession = async (
  request: FastifyRequest,
  id: string,
  sessionToken: string,
) => {
  const sessionsRaw = await request.server.redis.get(id);
  let sessions: string[] = sessionsRaw ? JSON.parse(sessionsRaw) : [];
  return sessions.includes(sessionToken);
};

export const updateSession = async (
  request: FastifyRequest,
  id: string,
  sessionToken: string,
) => {
  const sessionsRaw = await request.server.redis.get(id);
  let sessions: string[] = sessionsRaw ? JSON.parse(sessionsRaw) : [];

  let updatedSessions = [];
  if (sessions.length === 3) {
    updatedSessions = [sessionToken];
  } else {
    updatedSessions = [...sessions, sessionToken];
  }

  request.server.redis.set(id, JSON.stringify(updatedSessions));
};

export const deleteSession = async (request: FastifyRequest, id: string) => {
  request.server.redis.del(id);
};
