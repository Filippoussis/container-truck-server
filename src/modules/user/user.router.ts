import { FastifyInstance } from 'fastify';
import {
  getUserHandler,
  createUserInitHandler,
  createUserFinalHandler,
  loginUserHandler,
  getUsersHandler,
  logoutUserHandler,
  changePasswordInitHandler,
  changePasswordFinalHandler,
  updateUserInfoHandler,
} from './user.controller.js';
import {
  createUserInitReqJsonSchema,
  createUserFinalReqJsonSchema,
  createUserResJsonSchema,
  loginUserReqJsonSchema,
  loginUserResJsonSchema,
  changePasswordInitReqSchema,
  changePasswordFinalReqSchema,
  updateUserInfoReqSchema,
  updateUserInfoResSchema,
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

  server.post('/logout', logoutUserHandler);
  server.post(
    '/reset-password',
    {
      schema: {
        body: changePasswordInitReqSchema,
      },
    },
    changePasswordInitHandler,
  );
  server.patch(
    '/reset-password',
    {
      schema: {
        body: changePasswordFinalReqSchema,
      },
      preValidation: server.authenticate,
    },
    changePasswordFinalHandler,
  );
  server.patch(
    '/updateUserInfo',
    {
      schema: {
        body: updateUserInfoReqSchema,
        response: { 200: updateUserInfoResSchema },
      },
      preValidation: server.authenticate,
    },
    updateUserInfoHandler,
  );
  server.get('/me', { preValidation: [server.authenticate] }, getUserHandler);
  server.get(
    '/getAll',
    { preValidation: [server.authenticate] },
    getUsersHandler,
  );
};
