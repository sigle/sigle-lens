import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    SENTRY_DSN: z.string().url().optional(),
    POSTHOG_API_KEY: z.string().optional(),
    POSTHOG_API_HOST: z.string().optional(),
    LENS_ENV: z.enum(["development", "production"]),
    LENS_APP_ID: z.string().min(1),
    IRYS_PRIVATE_KEY: z.string().min(1),
    TURSO_CONNECTION_URL: z.string().url(),
    TURSO_AUTH_TOKEN: z.string().min(1).optional(),
    FLEEK_API_KEY: z.string().min(1),
    FLEEK_PROJECT_ID: z.string().min(1),
    IPFS_GATEWAY_URL: z.string().url().optional().default("https://ipfs.io"),
  },

  // @ts-expect-error types are not properly inferred by nitro
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
