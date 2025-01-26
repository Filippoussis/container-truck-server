import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createUser,
  findUserByEmail,
  findUsers,
  changePassword,
} from './user.service.js';
import {
  CreateUserInitInput,
  CreateUserFinalInput,
  LoginUserInput,
} from './user.schema.js';
import { updateSession, deleteSession } from '@/plugins/fredis/helpers.js';
import { verifyPassword } from '@/utils/hash.js';

export const createUserInitHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInitInput;
  }>,
  reply: FastifyReply,
) => {
  const { email } = request.body;

  try {
    const findedUser = await findUserByEmail(email);

    const activateToken = await reply.jwtSign({ email }, { expiresIn: '5m' });

    const link = `http://localhost:5173/register/${activateToken}`;
    const html = `<a href=${link}>${link}</a>`;

    if (!findedUser) {
      reply.server.mailer.sendMail({
        to: 'androsphilippos@gmail.com',
        subject: 'Подтверждение регистрации',
        html,
      });
    }
    return reply.code(204).send();
  } catch (err) {
    return reply.code(500).send(err);
  }
};

export const createUserFinalHandler = async (
  request: FastifyRequest<{
    Body: CreateUserFinalInput;
  }>,
  reply: FastifyReply,
) => {
  const body = request.body;

  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (e) {
    return reply.code(500).send(e);
  }
};

export const loginUserHandler = async (
  request: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply,
) => {
  const body = request.body;

  try {
    const user = await findUserByEmail(body.email);

    if (!user) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const passwordIsVerified = verifyPassword({
      candidatePassword: body.password,
      hash: user.password!,
      salt: user.salt!,
    });

    if (!passwordIsVerified) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const { password, salt, ...rest } = user;
    const { id, email } = rest;

    const sessionToken = await reply.jwtSign(
      { id, email },
      { expiresIn: '5m' },
    );

    updateSession(request, id, sessionToken);

    reply.setCookie('sessionToken', sessionToken, {
      // domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 300,
      sameSite: 'none',
    });

    return {
      email,
    };
  } catch (e) {
    return reply.code(500).send(e);
  }
};

export const logoutUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    if (request.cookies) {
      if (request.cookies.sessionToken) {
        const sessionToken = request.cookies.sessionToken;
        const decodedToken = request.server.jwt.decode<{
          id: string;
        }>(sessionToken);
        if (decodedToken !== null) {
          deleteSession(request, decodedToken.id);

          reply
            .setCookie('sessionToken', '', {
              // domain: 'localhost',
              path: '/',
              httpOnly: true,
              maxAge: 0,
              sameSite: 'none',
            })
            .code(204)
            .send();
        }
      }
    }
  } catch (e) {
    return reply.code(500).send(e);
  }
};

export const changePasswordInitHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInitInput;
  }>,
  reply: FastifyReply,
) => {
  const { email } = request.body;

  try {
    const findedUser = await findUserByEmail(email);

    if (findedUser) {
      const resetToken = await reply.jwtSign(
        { email: findedUser.email },
        { expiresIn: '5m' },
      );

      const link = `http://localhost:5173/changePassword/${resetToken}`;
      const html = `<a href=${link}>${link}</a>`;

      reply.server.mailer.sendMail({
        to: 'androsphilippos@gmail.com',
        subject: 'Сброс пароля',
        html,
      });
    }
    return reply.code(204).send();
  } catch (err) {
    return reply.code(500).send(err);
  }
};

export const changePasswordFinalHandler = async (
  request: FastifyRequest<{
    Body: CreateUserFinalInput;
  }>,
  reply: FastifyReply,
) => {
  const body = request.body;

  try {
    await changePassword(body);
    return reply.code(204).send();
  } catch (e) {
    return reply.code(500).send(e);
  }
};

export const getUsersHandler = async () => {
  const users = await findUsers();
  return users;
};
