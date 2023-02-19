import { z } from 'zod';
import { config } from 'dotenv';

const schema = z.object({
  PORT: z.string(),
  SECRET: z.string(),
});

config();

const env = schema.parse(process.env);

export { env };
