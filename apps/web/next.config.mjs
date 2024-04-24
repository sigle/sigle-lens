import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  sentry: {
    // Prevents source maps from being exposed in production
    hideSourceMaps: false,
    // Upload large source maps to Sentry
    widenClientFileUpload: true,
    // Disable logger to save bundle size
    disableLogger: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
