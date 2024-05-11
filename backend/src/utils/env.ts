import "dotenv/config";
import { z, ZodError } from "zod";

const configSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d{4,5}$/)
    .optional()
    .default("3000"),
  API_BASE_URL: z.string().url().default("/api"),
  DB_URL: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("postgres://") || url.startsWith("postgresql://"),
      "DB_URL must be a valid postgresql url"
    ),
  FROM_NAME: z.string().default("Verify"),
  FROM_EMAIL: z.string().email(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  JWT_SECRET: z.string(),
  MQTT_BROKER: z.string(),
  MQTT_USERNAME: z.string(),
  MQTT_PASSWORD: z.string(),
  PUSHER_INSTANCE_ID: z.string(),
  PUSHER_SECRET_KEY: z.string(),
});

try {
  configSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    console.error(error.errors);
  }
  process.exit(1);
}

export type Env = z.infer<typeof configSchema>;
export const db_url = process.env.DB_URL;
