import * as Sentry from "@sentry/node";
import { type PostHog } from "posthog-node";
import { type AuthenticatedUser } from "./middleware/2.auth";

declare module "h3" {
  interface H3EventContext {
    $sentry: typeof Sentry;
    $posthog: PostHog;
    user: AuthenticatedUser;
  }
}
