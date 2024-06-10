import { env } from "@/env";
import { SessionType, useSession } from "@lens-protocol/react-web";
import * as Sentry from "@sentry/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

/**
 * Initialise PostHog when the session finish loading
 */
export function PostHogInit() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { loading: sessionLoading, data: session } = useSession();

  useEffect(() => {
    if (!sessionLoading && session && env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "https://app.posthog.com",
        // Disable automatic pageview capture, as we capture manually
        capture_pageview: false,
        // We use our own events here
        autocapture: false,
        debug: false,
        persistence: "localStorage",
        // Initialise the distinct ID with the user address
        bootstrap: {
          distinctID:
            session.type === SessionType.Anonymous
              ? undefined
              : session.address,
        },
      });
      setIsInitialized(true);
    }
    if (
      !sessionLoading &&
      session &&
      env.NEXT_PUBLIC_SENTRY_DSN &&
      session.type !== SessionType.Anonymous
    ) {
      Sentry.setUser({
        id: session.address,
      });
    }
    // Do not add session to the dependencies, as we don't want to re-init posthog after the user login
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLoading]);

  if (!isInitialized) return null;

  // We only render the pageview component once the session is loaded and posthog is initialised
  // That way we don't miss the first pageview event
  return <PostHogPageview />;
}

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
