import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  webpack: (config) => {
    // Used for connectkit to work with nextjs
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

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
