import { env } from "@/env";
import { LensClient, development, production } from "@lens-protocol/client";

export const lensEnvironment =
  env.NEXT_PUBLIC_LENS_ENV === "production" ? production : development;

export const lensClient = new LensClient({
  environment: lensEnvironment,
});
