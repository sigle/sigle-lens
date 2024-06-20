"use client";
import { env } from "@/env";
import { PostHogInit } from "@/lib/posthog";
import {
  type LensConfig,
  LensProvider,
  development,
  production,
} from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Toaster } from "sonner";
import { polygon, polygonAmoy } from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: "Sigle",
    appDescription: "Web3 writing platform for Web3 writers",
    appUrl: env.NEXT_PUBLIC_APP_URL,
    appIcon: `${env.NEXT_PUBLIC_APP_URL}/images/icon-192x192.png`,
    chains: [env.NEXT_PUBLIC_LENS_ENV === "production" ? polygon : polygonAmoy],
    ssr: true,
  }),
);

const lensConfig: LensConfig = {
  bindings: wagmiBindings(config),
  environment:
    env.NEXT_PUBLIC_LENS_ENV === "production" ? production : development,
};

const OpenAPIInterceptor = dynamic(
  () =>
    import("@/components/Authentication/OpenAPIInterceptor").then(
      (mod) => mod.OpenAPIInterceptor,
    ),
  {
    ssr: false,
  },
);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Theme grayColor="gray" accentColor="indigo" radius="large">
          <PostHogProvider client={posthog}>
            <WagmiProvider config={config}>
              <ConnectKitProvider>
                <LensProvider config={lensConfig}>
                  {children}
                  <OpenAPIInterceptor />
                  <PostHogInit />
                  <Toaster closeButton />
                </LensProvider>
              </ConnectKitProvider>
            </WagmiProvider>
          </PostHogProvider>
        </Theme>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
