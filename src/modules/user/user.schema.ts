import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const emailZ = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
};

const passwordZ = {
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
};

const credentialsZ = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
};

const userInfoZ = {
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  mobilePhone: z.string(),
  workPhone: z.string(),
};

// createUser
const createUserInitReqZodSchema = z.object(emailZ);
const createUserFinalReqZodSchema = z.object(credentialsZ);

const createUserResZodSchema = z.object({
  email: z.string(),
});

export type CreateUserInitInput = z.infer<typeof createUserInitReqZodSchema>;
export type CreateUserFinalInput = z.infer<typeof createUserFinalReqZodSchema>;

export const createUserInitReqJsonSchema = zodToJsonSchema(
  createUserInitReqZodSchema,
);
export const createUserFinalReqJsonSchema = zodToJsonSchema(
  createUserFinalReqZodSchema,
);
export const createUserResJsonSchema = zodToJsonSchema(createUserResZodSchema);

// loginUser
const loginUserReqZodSchema = z.object({
  ...emailZ,
  ...passwordZ,
});
const loginUserResZodSchema = z.object({
  email: z.string(),
});

export const loginUserReqJsonSchema = zodToJsonSchema(loginUserReqZodSchema);
export const loginUserResJsonSchema = zodToJsonSchema(loginUserResZodSchema);

export type LoginUserInput = z.infer<typeof loginUserReqZodSchema>;

// changePassword
const changePasswordInitReqZodSchema = z.object(emailZ);
const changePasswordFinalReqZodSchema = z.object(credentialsZ);

export const changePasswordInitReqSchema = zodToJsonSchema(
  changePasswordInitReqZodSchema,
);
export const changePasswordFinalReqSchema = zodToJsonSchema(
  changePasswordFinalReqZodSchema,
);

export type ChangePasswordInitInput = z.infer<
  typeof changePasswordInitReqZodSchema
>;
export type ChangePasswordFinalInput = z.infer<
  typeof changePasswordFinalReqZodSchema
>;

// updateUserInfo
const updateUserInfoReqZodSchema = z.object(userInfoZ);
const updateUserInfoResZodSchema = z.object(userInfoZ);

export const updateUserInfoReqSchema = zodToJsonSchema(
  updateUserInfoReqZodSchema,
);

export const updateUserInfoResSchema = zodToJsonSchema(
  updateUserInfoResZodSchema,
);

export type UpdateUserInfoInput = z.infer<typeof updateUserInfoReqZodSchema>;
