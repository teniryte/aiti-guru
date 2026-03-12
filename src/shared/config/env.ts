import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
});

const parsed = envSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
});

if (!parsed.success) {
  throw new Error(`Invalid env: ${parsed.error.message}.`);
}

export const env = parsed.data;
