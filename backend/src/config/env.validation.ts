import * as Joi from "joi";

interface EnvironmentVariables {
  NODE_ENV: "development" | "test" | "production";
  PORT: number;
  API_PREFIX: string;
  FRONTEND_URL: string;
  ADMIN_PANEL_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_FOLDER?: string;
  ADMIN_SEED_NAME?: string;
  ADMIN_SEED_EMAIL?: string;
  ADMIN_SEED_PASSWORD?: string;
  USER_SEED_NAME?: string;
  USER_SEED_EMAIL?: string;
  USER_SEED_PASSWORD?: string;
}

const envSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().port().default(4000),
  API_PREFIX: Joi.string().trim().default("api"),
  FRONTEND_URL: Joi.string().uri({ scheme: ["http", "https"] }).required(),
  ADMIN_PANEL_URL: Joi.string().uri({ scheme: ["http", "https"] }).default("http://localhost:3001"),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(24).required(),
  JWT_EXPIRES_IN: Joi.string().default("7d"),
  CLOUDINARY_CLOUD_NAME: Joi.string().trim().required(),
  CLOUDINARY_API_KEY: Joi.string().trim().required(),
  CLOUDINARY_API_SECRET: Joi.string().trim().required(),
  CLOUDINARY_FOLDER: Joi.string().trim().default("used-billiard-store"),
  ADMIN_SEED_NAME: Joi.string().trim().default("Admin User"),
  ADMIN_SEED_EMAIL: Joi.string().trim().email().default("admin@usedbilliardstore.ca"),
  ADMIN_SEED_PASSWORD: Joi.string().min(8).default("admin12345"),
  USER_SEED_NAME: Joi.string().trim().default("Store User"),
  USER_SEED_EMAIL: Joi.string().trim().email().default("user@usedbilliardstore.ca"),
  USER_SEED_PASSWORD: Joi.string().min(8).default("user12345"),
});

export function validateEnvironment(config: Record<string, unknown>) {
  const { error, value } = envSchema.validate(config, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Environment validation failed: ${error.message}`);
  }

  return value;
}
