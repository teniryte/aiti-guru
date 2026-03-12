import { z } from 'zod';

const authUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
});

export const loginResponseSchema = authUserSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const meResponseSchema = authUserSchema;

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
export type MeResponseSchema = z.infer<typeof meResponseSchema>;
