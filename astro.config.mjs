// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { jsxstyle } from '@jsxstyle/astro/integration';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  prefetch: true,

  devToolbar: {
    enabled: false,
  },

  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      configPath: './wrangler.jsonc',
      enabled: true,
    },
  }),

  integrations: [react(), jsxstyle()],

  build: {
    assets: '-',
  },

  server: { port: 4710 },

  vite: {
    ssr: {
      external: ['node:crypto'],
    },
    build: {
      assetsDir: '-',
      rollupOptions: {
        output: {
          assetFileNames: '-/[hash][extname]',
        },
      },
    },
  },
});
