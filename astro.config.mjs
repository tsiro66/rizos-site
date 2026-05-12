// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    defaults: {
      format: 'webp',
      quality: 80,
    },
  },

  fonts: [
    {
      name: 'Geologica',
      cssVariable: '--font-geologica',
      provider: fontProviders.google(),
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      subsets: ['latin', 'greek'],
      display: 'swap',
    },
    {
      name: 'Alegreya',
      cssVariable: '--font-alegreya',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700, 800, 900],
      subsets: ['latin', 'greek'],
      display: 'swap',
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});