import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SENTRY_DSN: z.string().url().optional(),
    POSTHOG_API_KEY: z.string().optional(),
    LENS_ENV: z.enum(["development", "production"]),
    LENS_APP_ID: z.string().min(1),
    IRYS_PRIVATE_KEY: z.string().min(1),
  },

  // @ts-expect-error types are not properly inferred by nitro
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
