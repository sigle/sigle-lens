// Inspired by https://www.lichter.io/articles/nuxt3-sentry-recipe/
import { PostHog } from "posthog-node";
import { env } from "~/env";

// TODO test that this is not creating unrelated issues on dev
const posthog = new PostHog(env.POSTHOG_API_KEY || "dev");

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    event.context.$posthog = posthog;
  });

  // closing Sentry on shutdown
  nitroApp.hooks.hookOnce("close", async () => {
    await posthog.shutdown();
  });
});
