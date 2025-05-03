import { z } from 'zod';
import { zenv } from '@/libs/zenv/zenv.js';

export const env = zenv({
  dotenv: true,
  schema: z.object({
    PORT: z.number().default(3001),
    HOST: z.string().default('0.0.0.0'),
    JWT_SECRET: z.string(),
    DADATA_TOKEN: z.string(),
    MAIL_FROM: z.string(),
    MAIL_USER: z.string(),
    MAIL_PASS: z.string(),
  }),
});
