import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CLIENT_BASE_URL: z.string().url(),
  DATABASE_URL: z.string().startsWith("mongodb"),
  JWT_SECRET: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
