import { FastifyInstance } from 'fastify';
import {
  createUserInitHandler,
  createUserFinalHandler,
  loginUserHandler,
  getUsersHandler,
  logoutUserHandler,
  changePasswordInitHandler,
  changePasswordFinalHandler,
} from './user.controller.js';
import {
  createUserInitReqJsonSchema,
  createUserFinalReqJsonSchema,
  createUserResJsonSchema,
  loginUserReqJsonSchema,
  loginUserResJsonSchema,
  changePasswordInitReqSchema,
  changePasswordFinalReqSchema,
} from './user.schema.js';

export const userRouter = async (server: FastifyInstance) => {
  server.post(
    '/register',
    {
      schema: {
        body: createUserInitReqJsonSchema,
      },
    },
    createUserInitHandler,
  );

  server.patch(
    '/register',
    {
      schema: {
        body: createUserFinalReqJsonSchema,
        response: { 201: createUserResJsonSchema },
      },
      preValidation: server.authenticate,
    },
    createUserFinalHandler,
  );

  server.post(
    '/login',
    {
      schema: {
        body: loginUserReqJsonSchema,
        response: { 200: loginUserResJsonSchema },
      },
    },
    loginUserHandler,
  );

  server.get('/logout', logoutUserHandler);
  server.post(
    '/changePassword',
    {
      schema: {
        body: changePasswordInitReqSchema,
      },
    },
    changePasswordInitHandler,
  );
  server.patch(
    '/changePassword',
    {
      schema: {
        body: changePasswordFinalReqSchema,
      },
      preValidation: server.authenticate,
    },
    changePasswordFinalHandler,
  );
  server.get(
    '/getAll',
    { preValidation: [server.authenticate, server.hasSession] },
    getUsersHandler,
  );
};
