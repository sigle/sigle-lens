import * as Sentry from "@sentry/node";
import { PostHog } from "posthog-node";

declare module "h3" {
  interface H3EventContext {
    $sentry: typeof Sentry;
    $posthog: PostHog;
  }
}
