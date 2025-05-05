import { z } from 'zod';
import { zenv } from '@/libs/zenv/zenv.js';

export const env = zenv({
  dotenv: true,
  schema: z.object({
    HOST: z.string().default('0.0.0.0'),
    PORT: z.number().default(3001),
    JWT_SECRET: z.string(),
    DADATA_TOKEN: z.string(),
    MAIL_FROM: z.string(),
    MAIL_HOST: z.string(),
    MAIL_USER: z.string(),
    MAIL_PASS: z.string(),
  }),
});
