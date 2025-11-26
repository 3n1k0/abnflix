// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "app/",
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  features: {
    inlineStyles: false, // Disable inline styles for proper SSR CSS handling
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  typescript: {
    tsConfig: {
      include: [
        "../types/**/*.d.ts",
        "types/**/*.d.ts",
        "env.d.ts",
        "app/components/**/*.vue",
      ],
    },
  },
});
