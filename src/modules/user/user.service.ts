import { prisma } from '@/utils/prisma.js';
import {
  CreateUserFinalInput,
  ChangePasswordFinalInput,
} from './user.schema.js';
import { hashPassword } from '@/utils/hash.js';

export const createUser = async (input: CreateUserFinalInput) => {
  const { email, password } = input;
  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hash, salt },
  });

  return user;
};

export const changePassword = async (input: ChangePasswordFinalInput) => {
  const { email, password } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: { password: hash, salt },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const findUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return users;
};
