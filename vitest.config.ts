import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const appRoot = fileURLToPath(new URL('./app', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'nuxt/app': ['useRouter', 'useRoute', 'useSeoMeta'],
        },
      ],
      dirs: [fileURLToPath(new URL('./app/composables', import.meta.url))],
      dts: false,
    }),
    Components({
      dirs: [fileURLToPath(new URL('./app/components', import.meta.url))],
      dts: false,
    }),
  ],
  resolve: {
    alias: {
      '@': appRoot,
      '~': appRoot,
    },
  },
  test: {
    environment: 'jsdom',
  },
})
