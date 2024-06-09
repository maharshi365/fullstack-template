import dotenv from 'dotenv';
import { z } from 'zod';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/.env`, override: true });

const EnvSchema = z.object({
  // SERVER SETTINGS
  PORT: z.coerce.number().default(5000),
  SERVER_URL: z.string().default('http://localhost:5000'),

  // Authentication
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export default EnvSchema.parse(process.env);
