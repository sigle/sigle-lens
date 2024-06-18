import nextBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  webpack: (config) => {
    // Used for connectkit to work with nextjs
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  silent: true,
  telemetry: false,
  // Prevents source maps from being exposed in production
  hideSourceMaps: false,
  // Upload large source maps to Sentry
  widenClientFileUpload: true,
  // Disable logger to save bundle size
  disableLogger: true,
});
