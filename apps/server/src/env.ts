import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SENTRY_DSN: z.string().url().optional(),
    LENS_ENV: z.enum(["development", "production"]),
  },

  client: {},
  clientPrefix: "PUBLIC_",

  // @ts-expect-error types are not properly inferred by nitro
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
