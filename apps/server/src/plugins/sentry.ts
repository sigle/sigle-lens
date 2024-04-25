// Inspired by https://www.lichter.io/articles/nuxt3-sentry-recipe/
import * as Sentry from "@sentry/node";
import { H3Error } from "h3";

export default defineNitroPlugin((nitroApp) => {
  const { SENTRY_DSN } = useRuntimeConfig();

  Sentry.init({
    dsn: SENTRY_DSN,
    // TODO setup correct environment
    environment: "testnet",
  });

  nitroApp.hooks.hook("error", (error) => {
    // Do not handle 404s and 422s
    if (error instanceof H3Error) {
      if (error.statusCode === 404 || error.statusCode === 422) {
        return;
      }
    }

    Sentry.captureException(error);
  });

  // closing Sentry on shutdown
  nitroApp.hooks.hookOnce("close", async () => {
    await Sentry.close(2000);
  });
});
