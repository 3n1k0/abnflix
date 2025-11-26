// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "app/",
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
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
