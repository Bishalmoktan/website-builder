import { z } from "zod";

export const signup = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export const signin = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type SignUpInput = z.infer<typeof signup>;
export type SignInInput = z.infer<typeof signin>;
