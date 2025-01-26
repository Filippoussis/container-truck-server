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

export type LoginUserInput = z.infer<typeof loginUserReqZodSchema>;

export const loginUserReqJsonSchema = zodToJsonSchema(loginUserReqZodSchema);
export const loginUserResJsonSchema = zodToJsonSchema(loginUserResZodSchema);

// changePassword
const changePasswordInitReqZodSchema = z.object(emailZ);
const changePasswordFinalReqZodSchema = z.object(credentialsZ);

export type ChangePasswordInitInput = z.infer<
  typeof changePasswordInitReqZodSchema
>;
export type ChangePasswordFinalInput = z.infer<
  typeof changePasswordFinalReqZodSchema
>;

export const changePasswordInitReqSchema = zodToJsonSchema(
  changePasswordInitReqZodSchema,
);
export const changePasswordFinalReqSchema = zodToJsonSchema(
  changePasswordFinalReqZodSchema,
);
