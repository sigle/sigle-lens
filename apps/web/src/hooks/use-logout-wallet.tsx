import { useLogout } from "@lens-protocol/react-web";
import * as Sentry from "@sentry/nextjs";
import { usePostHog } from "posthog-js/react";
import { useDisconnect } from "wagmi";

export const useLogoutWallet = () => {
  const { execute: logout } = useLogout();
  const { disconnectAsync } = useDisconnect();
  const posthog = usePostHog();

  const logoutWithWallet = async () => {
    // Logout from Lens
    await logout();
    // Disconnect from wallet
    await disconnectAsync();
    posthog.capture("logout");
    posthog.reset();
    Sentry.setUser(null);
  };

  return {
    logoutWithWallet,
  };
};
