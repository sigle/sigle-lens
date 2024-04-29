import { LensClient, development, production } from "@lens-protocol/client";
import { env } from "~/env";

export const lensClient = new LensClient({
  environment: env.LENS_ENV === "production" ? production : development,
});
