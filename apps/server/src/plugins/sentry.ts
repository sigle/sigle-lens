// Inspired by https://www.lichter.io/articles/nuxt3-sentry-recipe/
import * as Sentry from "@sentry/node";
import { H3Error } from "h3";
import { env } from "~/env";

export default defineNitroPlugin((nitroApp) => {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.LENS_ENV === "production" ? "production" : "testnet",
  });

  nitroApp.hooks.hook("request", (event) => {
    event.context.$sentry = Sentry;
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
