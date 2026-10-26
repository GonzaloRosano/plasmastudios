// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: update once plasmastudios has a real domain
  site: 'https://plasmastudios.vercel.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});