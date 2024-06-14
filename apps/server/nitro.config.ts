export default defineNitroConfig({
  compatibilityDate: "2024-06-12",
  srcDir: "src",
  experimental: {
    openAPI: true,
  },
  storage: {
    lens: {
      driver: "lruCache",
    },
  },
});
