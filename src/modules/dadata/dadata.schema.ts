import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const schema = z.object({
  query: z.string(),
});

export type DadataInput = z.infer<typeof schema>;
export const dadataJsonSchema = zodToJsonSchema(schema);
